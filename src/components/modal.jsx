import React, { useEffect, useCallback } from 'react';
import { X, Phone, Mail, Globe, MapPin, Calendar, Building, Truck, Settings, Package, Loader2, RefreshCw } from 'lucide-react';
import { useSocioData } from '../services/use-socio-data'; // Ajusta la ruta según tu estructura
import './modal.css';

const SociosModal = ({ socioId, isOpen = false, onClose }) => {
  const { 
    socioData, 
    loading, 
    error, 
    loadSocioData, 
    reloadSocioData,
    clearSocioData,
    // Usar los valores memoizados directamente en lugar de las funciones
    contactInfo,
    equipmentSummary,
    metadata,
    hasData
  } = useSocioData();

  console.log('🔄 ESTADO DEL HOOK EN RENDER:', {
    socioData: !!socioData, // Solo log del boolean para reducir ruido
    hasData,
    loading,
    error: !!error
  });

  // Cargar datos cuando se abre el modal
  useEffect(() => {
    console.log('🔍 Modal useEffect Debug:', {
      isOpen,
      socioId,
      typeof_socioId: typeof socioId
    });
    
    if (isOpen && socioId) {
      console.log('📞 Llamando loadSocioData con:', socioId);
      loadSocioData(socioId);
    }
    
    // Limpiar datos cuando se cierra el modal
    if (!isOpen) {
      clearSocioData();
    }
  }, [isOpen, socioId, loadSocioData, clearSocioData]);

  // Función para cerrar el modal - usar useCallback para estabilizar la función
  const handleCloseModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Función para recargar datos - usar useCallback para estabilizar la función
  const handleReload = useCallback(() => {
    if (socioId) {
      reloadSocioData(socioId);
    }
  }, [socioId, reloadSocioData]);

  // Manejar click en el overlay para cerrar
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  // Manejar tecla Escape para cerrar - OPTIMIZADO
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleCloseModal();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Bloquear scroll del body
      document.body.style.overflow = 'hidden';
    }

    // Log reducido para evitar spam en consola
    console.log('🔍 Modal Debug (Estado):', {
      hasData,
      loading,
      hasError: !!error,
      hasContactInfo: !!contactInfo,
      hasEquipmentSummary: !!equipmentSummary,
      hasMetadata: !!metadata
    });

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restaurar scroll del body
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleCloseModal, hasData, loading, error, contactInfo, equipmentSummary, metadata]);

  // Componente para mostrar equipamiento
  const EquipmentCard = ({ title, data, icon: Icon, type }) => {
    if (!data || data.length === 0) return null;

    return (
      <div className="equipment-card">
        <div className="equipment-card-header">
          <Icon className="equipment-icon" />
          <h3 className="equipment-title">{title}</h3>
          <span className="equipment-count">({data.length})</span>
        </div>
        <div className="equipment-list">
          {data.map((item, index) => (
            <div key={index} className="equipment-item">
              {type === 'inventario' ? (
                <>
                  <span className="equipment-name">{item.nombre}</span>
                  <span className="equipment-quantity">{item.cantidad}</span>
                </>
              ) : (
                <>
                  <span className="equipment-brand">{item.marca}</span>
                  <span className="equipment-model">{item.modelo}</span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Componente de loading
  const LoadingSpinner = () => (
    <div className="loading-container">
      <Loader2 className="loading-spinner animate-spin" />
      <span className="loading-text">Cargando información del socio...</span>
    </div>
  );

  // Componente de error
  const ErrorMessage = () => (
    <div className="error-container">
      <div className="error-content">
        <X className="error-icon" />
        <p className="error-title">Error al cargar los datos</p>
        <p className="error-message">{error}</p>
      </div>
      <button
        onClick={handleReload}
        className="error-retry-button"
        disabled={loading}
      >
        <RefreshCw className={`error-retry-icon ${loading ? 'animate-spin' : ''}`} />
        {loading ? 'Cargando...' : 'Reintentar'}
      </button>
    </div>
  );

  // No renderizar nada si no está abierto
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">
              {contactInfo?.nombre || `Socio ID: ${socioId}`}
            </h2>
            {contactInfo?.contacto && (
              <p className="modal-subtitle">Contacto: {contactInfo.contacto}</p>
            )}
          </div>
          <div className="modal-header-actions">
            {hasData && (
              <button
                onClick={handleReload}
                className="modal-refresh-button"
                disabled={loading}
                title="Recargar datos"
              >
                <RefreshCw className={`refresh-icon ${loading ? 'animate-spin' : ''}`} />
              </button>
            )}
            <button
              onClick={handleCloseModal}
              className="modal-close-button"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="modal-content">
          {loading && <LoadingSpinner />}
          
          {error && <ErrorMessage />}
          
          {hasData && !loading && !error && (
            <>
              {/* Datos Base */}
              <div className="info-grid">
                <div className="info-card">
                  <h3 className="info-card-title">
                    <Building className="info-card-icon" />
                    Información de Contacto
                  </h3>
                  <div className="info-card-content">
                    {contactInfo?.direccion && (
                      <div className="contact-item">
                        <MapPin className="contact-icon" />
                        <div className="contact-info">
                          <p className="contact-address">{contactInfo.direccion}</p>
                          <p className="contact-city">
                            {contactInfo.ciudad}{contactInfo.provincia && `, ${contactInfo.provincia}`}
                          </p>
                          {contactInfo.codigoPostal && (
                            <p className="contact-postal">CP: {contactInfo.codigoPostal}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {contactInfo?.telefonoMovil && (
                      <div className="contact-item">
                        <Phone className="contact-icon" />
                        <a 
                          href={`tel:${contactInfo.telefonoMovil}`}
                          className="contact-phone"
                        >
                          {contactInfo.telefonoMovil}
                        </a>
                      </div>
                    )}
                    
                    {contactInfo?.telefonoFijo && (
                      <div className="contact-item">
                        <Phone className="contact-icon" />
                        <a 
                          href={`tel:${contactInfo.telefonoFijo}`}
                          className="contact-phone"
                        >
                          {contactInfo.telefonoFijo}
                        </a>
                      </div>
                    )}
                    
                    {contactInfo?.email && (
                      <div className="contact-item">
                        <Mail className="contact-icon" />
                        <a 
                          href={`mailto:${contactInfo.email}`} 
                          className="contact-email"
                        >
                          {contactInfo.email}
                        </a>
                      </div>
                    )}
                    
                    {contactInfo?.paginaWeb && (
                      <div className="contact-item">
                        <Globe className="contact-icon" />
                        <a 
                          href={contactInfo.paginaWeb} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="contact-website"
                        >
                          {contactInfo.paginaWeb}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {metadata && (
                  <div className="info-card">
                    <h3 className="info-card-title">
                      <Calendar className="info-card-icon" />
                      Información del Sistema
                    </h3>
                    <div className="system-info">
                      {metadata.total_empresas && (
                        <div className="system-info-item">
                          <span className="system-info-label">Total de empresas:</span>
                          <span className="system-info-value">{metadata.total_empresas}</span>
                        </div>
                      )}
                      {metadata.fecha_extraccion && (
                        <div className="system-info-item">
                          <span className="system-info-label">Fecha de extracción:</span>
                          <span className="system-info-value">{metadata.fecha_extraccion}</span>
                        </div>
                      )}
                      {metadata.descripcion && (
                        <div className="system-info-item">
                          <span className="system-info-label">Descripción:</span>
                          <span className="system-info-value">{metadata.descripcion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Equipamiento */}
              {equipmentSummary && (
                <div className="equipment-grid">
                  <EquipmentCard
                    title="Picadoras"
                    data={equipmentSummary.picadoras}
                    icon={Settings}
                    type="equipment"
                  />
                  <EquipmentCard
                    title="Cabezales"
                    data={equipmentSummary.cabezales}
                    icon={Package}
                    type="equipment"
                  />
                  <EquipmentCard
                    title="Embolsadoras"
                    data={equipmentSummary.embolsadoras}
                    icon={Package}
                    type="equipment"
                  />
                  <EquipmentCard
                    title="Inventario"
                    data={equipmentSummary.inventario}
                    icon={Truck}
                    type="inventario"
                  />
                </div>
              )}

              {/* Información Adicional */}
              {contactInfo?.otros && (
                <div className="additional-info">
                  <h3 className="additional-info-title">Información Adicional</h3>
                  <div className="additional-info-content">
                    {contactInfo.otros}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Estado vacío */}
          {!hasData && !loading && !error && (
            <div className="empty-state">
              <Building className="empty-state-icon" />
              <p className="empty-state-text">No hay datos para mostrar</p>
              <button
                onClick={() => loadSocioData(socioId)}
                className="empty-state-button"
              >
                Cargar Datos
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SociosModal;
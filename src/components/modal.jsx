import React, { useEffect, useCallback, useState } from 'react';
import { X, Phone, Mail, Globe, MapPin, Calendar, Building, Truck, Settings, Package, Loader2, RefreshCw } from 'lucide-react';
import './modal.css';
import apiService from '../services/apiService';

const SociosModal = ({ socioId, isOpen = false, onClose }) => {
  const [socioData, setSocioData] = useState(null);

  useEffect(() => {
    const loadSocioData = async () => {
        const response = await apiService.fetchSocioDetail(socioId);
        
        if (response.success && response.data) {
          setSocioData(response.data);
        }
    };

    if (isOpen && socioId) {
      loadSocioData();
    } 
  }, [isOpen, socioId]);

  const handleCloseModal = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Manejar click en el overlay para cerrar
  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  // Manejar tecla Escape para cerrar 
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

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restaurar scroll del body
      document.body.style.overflow = 'unset';
    };
  }, [handleCloseModal, isOpen, socioData]);

  // Componente para mostrar equipamiento
// Componente para mostrar equipamiento - ACTUALIZADO
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
        {data.map((item, index) => {
          if (type === 'inventario') {
            const keyIndex = index + 1;
            const nombre = item[`nombre${keyIndex}`];
            const cantidad = item[`cant${keyIndex}`];
            // Para inventario (ya formateado por formatInventoryData)
            if (!nombre && !cantidad) return null;
            
            return (
              <div key={index} className="equipment-item">
                <span className="equipment-brand">{nombre}</span>
                <span className="equipment-model">{cantidad}</span>
              </div>
            );
          } else {
            // Para equipamiento (código original)
            const keyIndex = index + 1;
            const marca = item[`marca${keyIndex}`];
            const modelo = item[`modelo${keyIndex}`];
            
            // Skip empty items
            if (!marca && !modelo) return null;
            
            return (
              <div key={index} className="equipment-item">
                <span className="equipment-brand">{marca}</span>
                <span className="equipment-model">{modelo}</span>
              </div>
            );
          }
        })}
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
              {socioData?.datosBase.nombre || `Socio ID: ${socioId}`}
            </h2>
            {socioData?.datosBase.contacto && (
              <p className="modal-subtitle">Contacto: {socioData.datosBase.contacto}</p>
            )}
          </div>
          <div className="modal-header-actions">
            <button
              onClick={handleCloseModal}
              className="modal-close-button"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="modal-content">
          {/* {loading && <LoadingSpinner />}
          
          { && <ErrorMessage />} */}
          
          {socioData && (
            <>
              {/* Datos Base */}
              <div className="info-grid">
                <div className="info-card">
                  <h3 className="info-card-title">
                    <Building className="info-card-icon" />
                    Información de Contacto
                  </h3>
                  <div className="info-card-content">
                    {socioData?.datosBase.direccion && (
                      <div className="contact-item">
                        <MapPin className="contact-icon" />
                        <div className="contact-info">
                          <p className="contact-address">{socioData.datosBase.direccion}</p>
                          <p className="contact-city">
                            {socioData.datosBase.ciudad}{socioData.datosBase.provincia && `, ${socioData.datosBase.provincia}`}
                          </p>
                          {socioData.datosBase.codigoPostal && (
                            <p className="contact-postal">CP: {socioData.datosBase.codigoPostal}</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {socioData?.datosBase.telefono_movil && (
                      <div className="contact-item">
                        <Phone className="contact-icon" />
                        <a 
                          href={`tel:${socioData.datosBase.telefono_movil}`}
                          className="contact-phone"
                        >
                          {socioData.datosBase.telefono_movil}
                        </a>
                      </div>
                    )}
                    
                    {socioData?.datosBase.telefono_fijo && (
                      <div className="contact-item">
                        <Phone className="contact-icon" />
                        <a 
                          href={`tel:${socioData.datosBase.telefono_fijo}`}
                          className="contact-phone"
                        >
                          {socioData.datosBase.telefono_fijo}
                        </a>
                      </div>
                    )}
                    
                    {socioData?.datosBase.email && (
                      <div className="contact-item">
                        <Mail className="contact-icon" />
                        <a 
                          href={`mailto:${socioData.datosBase.email}`} 
                          className="contact-email"
                        >
                          {socioData.datosBase.email}
                        </a>
                      </div>
                    )}
                    
                    {socioData?.datosBase.pagina_web && (
                      <div className="contact-item">
                        <Globe className="contact-icon" />
                        <a 
                          href={socioData.datosBase.pagina_web} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="contact-website"
                        >
                          {socioData.datosBase.pagina_web}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {socioData.metadata && (
                  <div className="info-card">
                    <h3 className="info-card-title">
                      <Calendar className="info-card-icon" />
                      Información del Sistema
                    </h3>
                    <div className="system-info">
                      {socioData.metadata.total_empresas && (
                        <div className="system-info-item">
                          <span className="system-info-label">Total de empresas:</span>
                          <span className="system-info-value">{socioData.metadata.total_empresas}</span>
                        </div>
                      )}
                      {socioData.metadata.fecha_extraccion && (
                        <div className="system-info-item">
                          <span className="system-info-label">Fecha de extracción:</span>
                          <span className="system-info-value">{socioData.metadata.fecha_extraccion}</span>
                        </div>
                      )}
                      {socioData.metadata.descripcion && (
                        <div className="system-info-item">
                          <span className="system-info-label">Descripción:</span>
                          <span className="system-info-value">{socioData.metadata.descripcion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Equipamiento */}
              {socioData && (
                <div className="equipment-grid">
                  <EquipmentCard
                    title="Picadoras"
                    data={socioData.picadoras}
                    icon={Settings}
                    type="equipment"
                  />
                  <EquipmentCard
                    title="Cabezales"
                    data={socioData.cabezales}
                    icon={Package}
                    type="equipment"
                  />
                  <EquipmentCard
                    title="Embolsadoras"
                    data={socioData.embolsadoras}
                    icon={Package}
                    type="equipment"
                  />
                  <EquipmentCard
                    title="Inventario"
                    data={socioData.inventario}
                    icon={Truck}
                    type="inventario"
                  />
                </div>
              )}

              {/* Información Adicional */}
              {socioData?.datosBase.otros && (
                <div className="additional-info">
                  <h3 className="additional-info-title">Información Adicional</h3>
                  <div className="additional-info-content">
                    {socioData.datosBase.otros}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SociosModal;
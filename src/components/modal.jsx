import React, { useEffect, useCallback, useState } from 'react';
import { X, Phone, Mail, Globe, MapPin } from 'lucide-react';
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
  const EquipmentCard = ({ title, data, type }) => {
    if (!data || data.length === 0) return null;

    return (
      <div className="equipment-card">
        <div className="equipment-card-header">
          <h3 className="equipment-title">{title}</h3>
        </div>
        <div className="equipment-list">
          {data.map((item, index) => {
            if (type === 'inventario') {
              const keyIndex = index + 1;
              const nombre = item[`nombre${keyIndex}`];
              const cantidad = item[`cant${keyIndex}`];
              
              if (!nombre && !cantidad) return null;
              
              return (
                <div key={index} className="equipment-item">
                  <span className="equipment-brand">{nombre}</span>
                  <span className="equipment-model">{cantidad}</span>
                </div>
              );
            } else {
              const keyIndex = index + 1;
              const marca = item[`marca${keyIndex}`];
              const modelo = item[`modelo${keyIndex}`];
              
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
          {socioData && (
            <div className="modal-layout">
              {/* Información de Contacto - Ocupa toda la línea */}
              <div className="contact-section">
                <div className="info-card">
                  <h3 className="info-card-title">Información de Contacto</h3>
                  <div className="info-card-content">
                    {socioData?.datosBase.nombre && (
                      <div className="contact-item">
                        <span className="contact-label">Nombre:</span>
                        <div className="contact-info">
                          <span className="contact-address">{socioData.datosBase.nombre}</span>
                        </div>
                      </div>
                    )}

                    {socioData?.datosBase.direccion && (
                      <div className="contact-item">
                        <span className="contact-label">Dirección:</span>
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
                        <span className="contact-label">Teléfono:</span>
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
                        <span className="contact-label">Teléfono fijo:</span>
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
                        <span className="contact-label">Email:</span>
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
                        <span className="contact-label">Página web:</span>
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
              </div>

              {/* Título de Equipamiento */}
              {(socioData.picadoras?.length > 0 || socioData.cabezales?.length > 0 || socioData.embolsadoras?.length > 0 || socioData.inventario?.length > 0) && (
                <h2 className="section-title">Equipamiento</h2>
              )}

              {/* Equipamiento - Grid de 2 columnas en desktop */}
              <div className="equipment-grid">
                <EquipmentCard
                  title="Picadoras"
                  data={socioData.picadoras}
                  type="equipment"
                />
                <EquipmentCard
                  title="Cabezales"
                  data={socioData.cabezales}
                  type="equipment"
                />
                <EquipmentCard
                  title="Embolsadoras"
                  data={socioData.embolsadoras}
                  type="equipment"
                />
                <EquipmentCard
                  title="Inventario"
                  data={socioData.inventario}
                  type="inventario"
                />
              </div>

              {/* Información Adicional - Ocupa toda la línea */}
              {socioData?.datosBase.otros && (
                <div className="additional-section">
                  <div className="additional-info">
                    <h3 className="additional-info-title">Información Adicional</h3>
                    <div className="additional-info-content">
                      {socioData.datosBase.otros}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SociosModal;
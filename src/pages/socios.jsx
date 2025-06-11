import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './socios.css';
// Importar el servicio API
import apiService from '../services/apiService';
// Para obtener la lista general

// Componente Modal optimizado - carga datos dinámicamente
const EmpresaDetailModal = ({ empresaId, isOpen, onClose }) => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Cargar detalles cuando se abre el modal
  useEffect(() => {
    if (isOpen && empresaId) {
      loadEmpresaDetail();
    } else if (!isOpen) {
      // Limpiar datos cuando se cierra para liberar memoria
      setEmpresa(null);
      setError(null);
    }
  }, [isOpen, empresaId]);

  const loadEmpresaDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('🔍 Cargando detalles para empresa ID:', empresaId);
      
      // CORREGIDO: Usar empresaId en lugar de 1 hardcodeado
      const detail = await apiService.fetchEmpresaDetail(empresaId);
      console.log('✅ Detalles cargados:', detail);
      setEmpresa(detail);
    } catch (err) {
      setError('Error al cargar los detalles de la empresa');
      console.error('❌ Error loading empresa detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">
            {empresa ? `${empresa.empresa} - Detalle Completo` : 'Cargando...'}
          </h2>
          <button onClick={onClose} className="modal-close" aria-label="Cerrar modal">×</button>
        </div>

        <div className="modal-body">
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Cargando detalles...</p>
            </div>
          )}

          {error && (
            <div className="error-container">
              <p>{error}</p>
              <button onClick={loadEmpresaDetail} className="btn-detail">
                Reintentar
              </button>
            </div>
          )}

          {empresa && !loading && !error && (
            <table className="modal-table">
              <tbody>
                <tr key="header-basica"><td className="section-header" colSpan="2">INFORMACIÓN BÁSICA</td></tr>
                <tr key="empresa" className="modal-table-row">
                  <td className="modal-table-label">Empresa</td>
                  <td className="modal-table-value">{empresa.empresa}</td>
                </tr>
                <tr key="contacto" className="modal-table-row">
                  <td className="modal-table-label">Contacto</td>
                  <td className="modal-table-value">{empresa.contacto}</td>
                </tr>
                <tr key="email" className="modal-table-row">
                  <td className="modal-table-label">Email</td>
                  <td className="modal-table-value">{empresa.email}</td>
                </tr>
                <tr key="web" className="modal-table-row">
                  <td className="modal-table-label">Página Web</td>
                  <td className="modal-table-value">
                    {empresa.pagina_web ? (
                      <a href={empresa.pagina_web} target="_blank" rel="noopener noreferrer">
                        {empresa.pagina_web}
                      </a>
                    ) : 'No especificada'}
                  </td>
                </tr>

                <tr key="header-contacto"><td className="section-header" colSpan="2">CONTACTO</td></tr>
                <tr key="tel-movil" className="modal-table-row">
                  <td className="modal-table-label">Teléfono Móvil</td>
                  <td className="modal-table-value">{empresa.telefono_movil || empresa.telefono}</td>
                </tr>
                <tr key="tel-fijo" className="modal-table-row">
                  <td className="modal-table-label">Teléfono Fijo</td>
                  <td className="modal-table-value">{empresa.telefono_fijo || 'No especificado'}</td>
                </tr>

                <tr key="header-ubicacion"><td className="section-header" colSpan="2">UBICACIÓN</td></tr>
                <tr key="direccion" className="modal-table-row">
                  <td className="modal-table-label">Dirección</td>
                  <td className="modal-table-value">{empresa.direccion || 'No especificada'}</td>
                </tr>
                <tr key="ciudad" className="modal-table-row">
                  <td className="modal-table-label">Ciudad</td>
                  <td className="modal-table-value">{empresa.ciudad}</td>
                </tr>
                <tr key="provincia" className="modal-table-row">
                  <td className="modal-table-label">Provincia</td>
                  <td className="modal-table-value">{empresa.provincia}</td>
                </tr>
                <tr key="cp" className="modal-table-row">
                  <td className="modal-table-label">Código Postal</td>
                  <td className="modal-table-value">{empresa.codigo_postal || 'No especificado'}</td>
                </tr>

                {/* NUEVA SECCIÓN: Datos adicionales simulados/reales */}
                {empresa.equipamiento && (
                  <>
                    <tr key="header-equipamiento"><td className="section-header" colSpan="2">EQUIPAMIENTO PRINCIPAL</td></tr>
                    {empresa.equipamiento.maquinaria_principal && empresa.equipamiento.maquinaria_principal.map((maquina, index) => (
                      <tr key={`maquina-${index}`} className="modal-table-row">
                        <td className="modal-table-label">Maquinaria {index + 1}</td>
                        <td className="modal-table-value">{maquina}</td>
                      </tr>
                    ))}
                  </>
                )}

                {empresa.inventario && (
                  <>
                    <tr key="header-inventario"><td className="section-header" colSpan="2">INVENTARIO</td></tr>
                    <tr key="tractores" className="modal-table-row">
                      <td className="modal-table-label">Tractores</td>
                      <td className="modal-table-value">{empresa.inventario.tractores || 'No especificado'}</td>
                    </tr>
                    <tr key="camiones" className="modal-table-row">
                      <td className="modal-table-label">Camiones</td>
                      <td className="modal-table-value">{empresa.inventario.camiones || empresa.camiones || 'No especificado'}</td>
                    </tr>
                    <tr key="implementos" className="modal-table-row">
                      <td className="modal-table-label">Implementos</td>
                      <td className="modal-table-value">{empresa.inventario.implementos || 'No especificado'}</td>
                    </tr>
                  </>
                )}

                {/* Sección de maquinaria específica (datos originales) */}
                <tr key="header-maquinaria"><td className="section-header" colSpan="2">MAQUINARIA ESPECÍFICA</td></tr>
                <tr key="picadora-marca" className="modal-table-row">
                  <td className="modal-table-label">Picadora Marca</td>
                  <td className="modal-table-value">{empresa.picadora_marca || 'No especificada'}</td>
                </tr>
                <tr key="picadora-modelo" className="modal-table-row">
                  <td className="modal-table-label">Picadora Modelo</td>
                  <td className="modal-table-value">{empresa.picadora_modelo || 'No especificado'}</td>
                </tr>
                <tr key="cabezal" className="modal-table-row">
                  <td className="modal-table-label">Cabezal</td>
                  <td className="modal-table-value">{empresa.cabezal || 'No especificado'}</td>
                </tr>
                <tr key="embolsadora" className="modal-table-row">
                  <td className="modal-table-label">Embolsadora</td>
                  <td className="modal-table-value">{empresa.embolsadora || 'No especificada'}</td>
                </tr>
                <tr key="tractor" className="modal-table-row">
                  <td className="modal-table-label">Tractor</td>
                  <td className="modal-table-value">{empresa.tractor || 'No especificado'}</td>
                </tr>

                <tr key="header-vehiculos"><td className="section-header" colSpan="2">VEHÍCULOS Y TRANSPORTE</td></tr>
                <tr key="bateas" className="modal-table-row">
                  <td className="modal-table-label">Bateas</td>
                  <td className="modal-table-value">{empresa.bateas || 'No especificadas'}</td>
                </tr>
                <tr key="carros" className="modal-table-row">
                  <td className="modal-table-label">Carros</td>
                  <td className="modal-table-value">{empresa.carros || 'No especificados'}</td>
                </tr>
                <tr key="carretones" className="modal-table-row">
                  <td className="modal-table-label">Carretones</td>
                  <td className="modal-table-value">{empresa.carretones || 'No especificados'}</td>
                </tr>

                <tr key="header-infraestructura"><td className="section-header" colSpan="2">INFRAESTRUCTURA</td></tr>
                <tr key="casillas" className="modal-table-row">
                  <td className="modal-table-label">Casillas</td>
                  <td className="modal-table-value">{empresa.casillas || 'No especificadas'}</td>
                </tr>
                <tr key="varios" className="modal-table-row">
                  <td className="modal-table-label">Varios</td>
                  <td className="modal-table-value">{empresa.varios || 'No especificado'}</td>
                </tr>

                <tr key="header-servicios"><td className="section-header" colSpan="2">SERVICIOS</td></tr>
                <tr key="descripcion" className="modal-table-row">
                  <td className="modal-table-label">Descripción</td>
                  <td className="modal-table-value">{empresa.servicio || empresa.descripcion}</td>
                </tr>

                {/* Información adicional si existe */}
                {empresa.calificacion && (
                  <tr key="calificacion" className="modal-table-row">
                    <td className="modal-table-label">Calificación</td>
                    <td className="modal-table-value">⭐ {empresa.calificacion}/5.0</td>
                  </tr>
                )}
                
                {empresa.años_experiencia && (
                  <tr key="experiencia" className="modal-table-row">
                    <td className="modal-table-label">Años de Experiencia</td>
                    <td className="modal-table-value">{empresa.años_experiencia} años</td>
                  </tr>
                )}

                {empresa.zona_cobertura && (
                  <tr key="zona" className="modal-table-row">
                    <td className="modal-table-label">Zona de Cobertura</td>
                    <td className="modal-table-value">{empresa.zona_cobertura}</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="btn-close">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

// Componente de paginación (sin cambios)
const Pagination = ({ pagination, onPageChange }) => {
  if (pagination.totalPages <= 1) return null;

  const getPageNumbers = () => {
    const { currentPage, totalPages } = pagination;
    const pages = [];
    const maxVisible = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '0.5rem', 
      padding: '1rem',
      flexWrap: 'wrap'
    }}>
      <button
        onClick={() => onPageChange(1)}
        disabled={!pagination.hasPrevPage}
        className="btn-detail"
        style={{ opacity: pagination.hasPrevPage ? 1 : 0.5 }}
      >
        ««
      </button>
      
      <button
        onClick={() => onPageChange(pagination.currentPage - 1)}
        disabled={!pagination.hasPrevPage}
        className="btn-detail"
        style={{ opacity: pagination.hasPrevPage ? 1 : 0.5 }}
      >
        ‹
      </button>

      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className="btn-detail"
          style={{
            backgroundColor: page === pagination.currentPage ? '#1d4ed8' : '#dbeafe',
            color: page === pagination.currentPage ? 'white' : '#1d4ed8'
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(pagination.currentPage + 1)}
        disabled={!pagination.hasNextPage}
        className="btn-detail"
        style={{ opacity: pagination.hasNextPage ? 1 : 0.5 }}
      >
        ›
      </button>
      
      <button
        onClick={() => onPageChange(pagination.totalPages)}
        disabled={!pagination.hasNextPage}
        className="btn-detail"
        style={{ opacity: pagination.hasNextPage ? 1 : 0.5 }}
      >
        »»
      </button>

      <span style={{ 
        marginLeft: '1rem', 
        fontSize: '0.875rem', 
        color: '#6b7280',
        whiteSpace: 'nowrap'
      }}>
        Página {pagination.currentPage} de {pagination.totalPages} ({pagination.totalItems} total)
      </span>
    </div>
  );
};

// Componente principal optimizado
const EmpresasTable = () => {
  // Estado optimizado - solo datos de la página actual
  const [empresas, setEmpresas] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estado del modal - solo ID, no datos completos
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debounced search para evitar muchas llamadas a la API
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setCurrentPage(1); // Reset a página 1 cuando se busca
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Cargar datos cuando cambia la página o el término de búsqueda
  useEffect(() => {
    loadEmpresas();
  }, [currentPage, debouncedSearchTerm]);

  const loadEmpresas = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📊 Cargando empresas - Página:', currentPage, 'Búsqueda:', debouncedSearchTerm);
      
      // Usar el servicio API importado
      const response = await apiService.fetchEmpresas({
        page: currentPage,
        limit: 20,
        search: debouncedSearchTerm
      });
      
      console.log('✅ Empresas cargadas:', response);
      setEmpresas(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError('Error al cargar las empresas');
      console.error('❌ Error loading empresas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = useCallback((empresaId) => {
    console.log('👁️ Abriendo modal para empresa ID:', empresaId);
    setSelectedEmpresaId(empresaId);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    console.log('❌ Cerrando modal');
    setIsModalOpen(false);
    setSelectedEmpresaId(null);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  if (error) {
    return (
      <div className="socios-container">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={loadEmpresas} className="btn-detail">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="socios-container">
        <div className="socios-header">
          <h1 className="socios-title">Listado de socios</h1>
          
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          )}

          {!loading && (
            <>
              <div className="table-wrapper">
                <table className="socios-table">
                  <thead className="table-header">
                    <tr>
                      <th>Provincia</th>
                      <th>Ciudad</th>
                      <th>Empresa</th>
                      <th>Contacto</th>
                      <th>Servicio</th>
                      <th>Telefono Móvil</th>
                      <th>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empresas.map((empresa) => (
                      <tr key={empresa.id} className="table-row">
                        <td className="table-cell">
                          <div className="empresa-name">
                            {empresa.provincia}
                          </div>
                        </td>
                        <td className="table-cell">
                          <span>{empresa.ciudad}</span>
                        </td>
                        <td className="table-cell">
                          <span>{empresa.empresa}</span>
                        </td>
                        <td className="table-cell">
                          <span>{empresa.contacto}</span>
                        </td>
                        <td className="table-cell">
                          <span>
                            {empresa.servicio && empresa.servicio.length > 30 
                              ? empresa.servicio.substring(0, 30) + '...' 
                              : empresa.servicio}
                          </span>
                        </td>
                        <td className="table-cell">
                          <span>{empresa.telefono_movil || empresa.telefono}</span>
                        </td>
                        <td className="table-cell">
                          <button
                            onClick={() => handleViewDetail(empresa.id)}
                            className="btn-detail"
                          >
                            👁️ Ver Detalle
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {empresas.length === 0 && !loading && (
                <div className="empty-state">
                  No se encontraron empresas
                </div>
              )}

              {pagination && (
                <Pagination 
                  pagination={pagination} 
                  onPageChange={handlePageChange} 
                />
              )}
            </>
          )}
        </div>

        <EmpresaDetailModal 
          empresaId={selectedEmpresaId}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default EmpresasTable;
import React, { useState, useEffect } from 'react';
import './socios.css';
import apiService from '../services/apiService';
import SociosModal from '../components/modal'; 
import Fondo from '../assets/images/imagenes-secciones/carrusel2.jpg';

const EmpresasTable = () => {
  
  // Dataset completo (se carga una sola vez)
  const [allEmpresas, setAllEmpresas] = useState([]);
  
  // Datos filtrados para mostrar en la tabla
  const [empresas, setEmpresas] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedSocioId, setSelectedSocioId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Cargar TODAS las empresas solo una vez al montar el componente
  useEffect(() => {
    loadAllEmpresas();
  }, []); // Array vacío = solo se ejecuta una vez

  // Filtrar localmente cuando cambia el término de búsqueda
  useEffect(() => {
    if (allEmpresas.length > 0) {
      const filtered = apiService.filterEmpresas(allEmpresas, searchTerm);
      setEmpresas(filtered);
      
      console.log('🔍 Filtrado local realizado:', {
        total: allEmpresas.length,
        filtered: filtered.length,
        searchTerm: searchTerm || '(sin filtro)'
      });
    }
  }, [searchTerm, allEmpresas]);

  // Función para cargar todas las empresas (solo se llama una vez)
  const loadAllEmpresas = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📊 Cargando TODAS las empresas (una sola vez)...');

      const response = await apiService.fetchAllEmpresas();

      console.log('✅ Empresas cargadas exitosamente:', response.data.length);
      
      // Guardar el dataset completo
      setAllEmpresas(response.data);
      
      // Mostrar todas inicialmente
      setEmpresas(response.data);
    } catch (err) {
      console.error('❌ Error loading empresas:', err);
      setError(err.message || 'Error al cargar las empresas');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (socioId) => {
    console.log('🔍 Solicitud de detalle para socio ID:', socioId);
    setSelectedSocioId(socioId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedSocioId(null);
  };

  if (error) {
    return (
      <div className="socios-container">
        <div className="error-container" style={{
          textAlign: 'center',
          padding: '40px',
          color: '#d32f2f',
          backgroundColor: '#ffebee',
          borderRadius: '8px',
          margin: '20px'
        }}>
          <h3>Error al cargar los datos</h3>
          <p>{error}</p>
          <button 
            onClick={loadAllEmpresas}
            className="btn-detail"
            style={{ marginTop: '15px' }}
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="socios-container">
        <div className="socios-header" style={{backgroundImage:`url(${Fondo})`}}>
          <div className='titulo-socios'>
            <h1 className="socios-title">Listado de socios</h1>
            <div className="search-container">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Buscar empresa, contacto, ciudad, provincia o servicio..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>

        <div className="table-container">
          {loading && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Cargando empresas...</p>
            </div>
          )}

          {!loading && (
            <>
              <div className="table-wrapper">
                <table className="socios-table">
                  <thead className="table-header">
                    <tr>
                      <th>ID</th>
                      <th>Provincia</th>
                      <th>Ciudad</th>
                      <th>Empresa</th>
                      <th>Contacto</th>
                      <th>Servicio</th>
                      <th>Tel. Móvil</th>
                      <th>Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empresas.map((empresa) => (
                      <tr key={empresa.id} className="table-row">
                        <td className="table-cell">
                          <strong>{empresa.id}</strong>
                        </td>
                        <td className="table-cell">
                          <div className="empresa-name">
                            {empresa.provincia || 'N/A'}
                          </div>
                        </td>
                        <td className="table-cell">
                          <span>{empresa.ciudad || 'N/A'}</span>
                        </td>
                        <td className="table-cell">
                          <span>{empresa.empresa || 'N/A'}</span>
                        </td>
                        <td className="table-cell">
                          <span>{empresa.contacto || 'N/A'}</span>
                        </td>
                        <td className="table-cell">
                          <span>
                            {empresa.servicio && empresa.servicio.length > 30
                              ? empresa.servicio.substring(0, 30) + '...'
                              : empresa.servicio || 'N/A'}
                          </span>
                        </td>
                        <td className="table-cell">
                          <span>{empresa.telefono_movil || empresa.telefono || 'N/A'}</span>
                        </td>
                        <td className="table-cell">
                          <button
                            onClick={() => handleOpenModal(empresa.id)}
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
                <div className="empty-state" style={{
                  textAlign: 'center',
                  padding: '40px',
                  color: '#666',
                  fontSize: '16px'
                }}>
                  {searchTerm ? 
                    `No se encontraron empresas que coincidan con "${searchTerm}"` : 
                    'No se encontraron empresas'
                  }
                </div>
              )}

              <div style={{
                padding: '1rem',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '0.875rem',
                borderTop: '1px solid #e5e7eb'
              }}>
                {searchTerm ? (
                  <>
                    Mostrando {empresas.length} de {allEmpresas.length} empresas
                    <span style={{ fontStyle: 'italic' }}> (filtradas por "{searchTerm}")</span>
                  </>
                ) : (
                  <>Total de empresas: {empresas.length}</>
                )}
              </div>
            </>
          )}
        </div>

        {modalOpen && selectedSocioId && (
          <SociosModal 
            socioId={selectedSocioId}
            isOpen={modalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default EmpresasTable;
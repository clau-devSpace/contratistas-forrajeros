import React, { useState, useEffect } from 'react';
import './socios.css';
// Importar el servicio API
import apiService from '../services/apiService';
// Importar el modal de detalle
import SociosModal from '../components/modal'; // Ajusta la ruta según tu estructura de carpetas

// Componente principal
const EmpresasTable = () => {
  // Estado para la tabla principal
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para el modal
  const [selectedSocioId, setSelectedSocioId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    loadEmpresas();
  }, [debouncedSearchTerm]);

  const loadEmpresas = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📊 Cargando empresas - Búsqueda:', debouncedSearchTerm);

      const response = await apiService.fetchEmpresas({
        search: debouncedSearchTerm
      });

      console.log('✅ Empresas cargadas:', response.data.length);
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
    
    // Solo permitir el modal para el socio 57 (por ahora)
    if (parseInt(socioId) === 57) {
      setSelectedSocioId(socioId);
      setModalOpen(true);
    } else {
      alert(`El detalle solo está disponible para el socio 57. ID seleccionado: ${socioId}`);
    }
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
            onClick={loadEmpresas} 
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
    <div className="socios-container">
      <div className="socios-header">
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
                    <th>Teléfono Móvil</th>
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
                          disabled={!empresa.id}
                          style={{
                            opacity: empresa.id === 57 ? 1 : 0.6,
                            cursor: empresa.id === 57 ? 'pointer' : 'not-allowed'
                          }}
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
              Total de empresas: {empresas.length}
              {searchTerm && ` (filtradas por "${searchTerm}")`}
            </div>
          </>
        )}
      </div>

      {/* Modal de detalle - se renderiza condicionalmente */}
      {modalOpen && selectedSocioId && (
        <SociosModal 
          socioId={selectedSocioId}
          isOpen={modalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EmpresasTable;
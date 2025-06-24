import React, { useState, useEffect, useCallback } from 'react';
import './socios.css';
// Importar el servicio API
import apiService from '../services/apiService';

//Componente Modal (los datos se cargan dinámicamente desde la API)
const EmpresaDetailModal = ({ empresaId, isOpen, onClose }) => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // LOG: Estado actual de la empresa y carga en cada render del modal
  console.log('--- EmpresaDetailModal Render ---');
  console.log('Estado actual de empresa:', empresa);
  console.log('Estado de loading:', loading);
  console.log('Estado de error:', error);
  console.log('-------------------------------');


  useEffect(() => {
    const loadEmpresa = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`[Modal] Iniciando carga para empresaId: ${empresaId}`); // LOG NUEVO
        const data = await apiService.fetchEmpresaDetail(empresaId);
        console.log('✅ Datos recibidos por el modal desde apiService:', data); // LOG NUEVO
        setEmpresa(data);
        console.log('[Modal] setEmpresa llamado con data.'); // LOG NUEVO
      } catch (err) {
        setError('Error al cargar los detalles');
        console.error('[Modal] Error loading empresa detail:', err); // LOG EXISTENTE, MEJORADO
      } finally {
        setLoading(false);
        console.log('[Modal] Carga finalizada (loading: false).'); // LOG NUEVO
      }
    };

    if (isOpen && empresaId) {
      console.log('[Modal] Modal está abierto y hay empresaId, iniciando loadEmpresa.'); // LOG NUEVO
      loadEmpresa();
    } else if (!isOpen) {
      console.log('[Modal] Modal cerrado, reseteando estados.'); // LOG NUEVO
      setEmpresa(null);
      setError(null);
    }
  }, [isOpen, empresaId]);

  if (!isOpen) {
    console.log('[Modal] Modal no está abierto, retornando null.'); // LOG NUEVO
    return null;
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{empresa?.nombre || empresa?.empresa || 'Cargando...'}</h2>
          <button onClick={onClose} className="modal-close">×</button>
        </div>
        <div className="modal-body">
          {loading && <p>Cargando datos...</p>}
          {error && <p>{error}</p>}
          {/* LOG: Verifica si empresa existe antes de renderizar el contenido */}
          {!loading && !error && !empresa && (
            <p>No se encontraron datos para mostrar o el formato recibido es incorrecto.</p>
          )}
          {empresa && (
            <div>
              <h3>Información de Contacto</h3>
              <p>Contacto: {empresa.contacto}</p>
              <p>Email: {empresa.email}</p>
              <p>Teléfono móvil: {empresa.telefono_movil}</p>
              <p>Teléfono fijo: {empresa.telefono_fijo}</p>
              <p>Dirección: {empresa.direccion}, {empresa.ciudad}, {empresa.provincia} ({empresa.codigo_postal})</p>
              <p>Web: <a href={empresa.pagina_web} target="_blank" rel="noopener noreferrer">{empresa.pagina_web}</a></p>

              <h3>Equipamiento</h3>
              {empresa.equipamiento && (
                <>
                  <h4>Picadoras</h4>
                  <ul>
                    {Object.entries(empresa.equipamiento.picadoras || {}).map(([key, val]) => (
                      <li key={key}>{val.modelo} - {val.plataforma}</li>
                    ))}
                  </ul>
                  <h4>Cabezales</h4>
                  <ul>
                    {Object.entries(empresa.equipamiento.cabezales || {}).map(([key, val]) => (
                      <li key={key}>{val.modelo} {val.plataforma ? `- ${val.plataforma}` : ''}</li>
                    ))}
                  </ul>
                  <h4>Otros Equipos</h4>
                  <ul>
                    {Object.entries(empresa.equipamiento.otros || {}).map(([key, val]) => (
                      <li key={key}>{val.modelo}</li>
                    ))}
                  </ul>
                </>
              )}

              <h3>Embolsadoras</h3>
              <ul>
                {Object.entries(empresa.embolsadoras || {}).map(([key, val]) => (
                  <li key={key}>{val.modelo}</li>
                ))}
              </ul>

              <h3>Maquinaria Adicional</h3>
              <ul>
                {Object.entries(empresa.maquinaria_adicional || {}).map(([key, val]) => (
                  <li key={key}>{val.modelo}{val.variantes && ` (Variantes: ${val.variantes.join(', ')})`}</li>
                ))}
              </ul>

              <h3>Inventario</h3>
              <ul>
                {Object.entries(empresa.inventario || {}).map(([key, val]) => (
                  <li key={key}>{key}: {val}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-close">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const EmpresasTable = () => {
  // Estado para la tabla principal
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Estado del modal
  const [selectedEmpresaId, setSelectedEmpresaId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      console.log('✅ Empresas cargadas:', response);
      setEmpresas(response.data);
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

  // Función para probar directamente la URL específica
  const testSpecificUrl = async () => {
    console.log('🧪 Probando URL específica con ID 1...');
    try {
      const testUrl = '/api/socios/1';
      console.log('🌐 URL de prueba:', testUrl);

      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors'
      });

      console.log('📡 Respuesta:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Datos recibidos:', data);
        alert('✅ Prueba exitosa! Revisa la consola para ver los datos.');
      } else {
        console.log('❌ Error HTTP:', response.status);
        alert(`❌ Error HTTP: ${response.status}`);
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert(`❌ Error: ${error.message}`);
    }
  };

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

          {/* Panel de pruebas para la URL específica */}
          <div style={{
            padding: '15px',
            margin: '10px 0',
            backgroundColor: '#e6f7ff',
            border: '2px solid #1890ff',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#1890ff', margin: '0 0 10px 0' }}>
              🎯 Prueba de URL Específica
            </h3>
            <p style={{ fontSize: '14px', margin: '5px 0', color: '#333' }}>
              URL objetivo: <code>https://ensiladores.com.ar/WebNEW/public/data/API_Socios.php/1</code>
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={testSpecificUrl}
                className="btn-detail"
                style={{ backgroundColor: '#1890ff', color: 'white' }}
              >
                🧪 Probar URL Específica
              </button>
              <button
                onClick={() => handleViewDetail(1)}
                className="btn-detail"
                style={{ backgroundColor: '#52c41a', color: 'white' }}
              >
                🎭 Abrir Modal con ID 1
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0' }}>
              El modal usará la URL específica que configuraste. Revisa la consola para ver los detalles de la comunicación con la API.
            </p>
          </div>

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
                      <th>ID</th>
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
                          <strong>{empresa.id}</strong>
                        </td>
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

              <div style={{
                padding: '1rem',
                textAlign: 'center',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                Total de empresas: {empresas.length}
              </div>
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
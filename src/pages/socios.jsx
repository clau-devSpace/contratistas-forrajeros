import React, { useState, useEffect, useMemo } from 'react';

// Estilos integrados
const styles = `
.socios-container {
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #333;
}

.socios-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.socios-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
  margin: 0;
}

.search-container {
  position: relative;
  width: 100%;
  max-width: 320px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.search-input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

.search-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  font-size: 1rem;
}

.table-container {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

.socios-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 700px;
}

.table-header {
  background-color: #f9fafb;
}

.table-header th {
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e5e7eb;
}

.table-row {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: #f9fafb;
}

.table-cell {
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  vertical-align: middle;
}

.empresa-name {
  font-weight: 500;
  color: #111827;
}

.empresa-id {
  font-weight: 500;
  color: #374151;
}

.btn-detail {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background-color: #dbeafe;
  color: #1d4ed8;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-detail:hover {
  background-color: #bfdbfe;
  transform: translateY(-1px);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 16rem;
}

.spinner {
  width: 3rem;
  height: 3rem;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3182ce;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #991b1b;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
  font-size: 0.875rem;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 60rem;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
  position: relative;
}

@keyframes slideIn {
  from { 
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to { 
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-header {
  background: #f8fafc;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
}

.modal-close {
  background: #e2e8f0;
  border: none;
  color: #4a5568;
  width: 2rem;
  height: 2rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #cbd5e0;
}

.modal-body {
  padding: 0;
}

.modal-table {
  width: 100%;
  border-collapse: collapse;
}

.modal-table-row {
  border-bottom: 1px solid #e2e8f0;
}

.modal-table-row:last-child {
  border-bottom: none;
}

.modal-table-label {
  padding: 1rem 1.5rem;
  background: #f8fafc;
  font-weight: 500;
  color: #4a5568;
  width: 200px;
  vertical-align: top;
  border-right: 1px solid #e2e8f0;
}

.modal-table-value {
  padding: 1rem 1.5rem;
  color: #2d3748;
  vertical-align: top;
}

.modal-table-value a {
  color: #3182ce;
  text-decoration: none;
}

.modal-table-value a:hover {
  text-decoration: underline;
}

.section-header {
  background: #667eea;
  color: white;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.modal-footer {
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
  text-align: right;
}

.btn-close {
  background: #6b7280;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: #4b5563;
}

@media (max-width: 768px) {
  .socios-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-container {
    max-width: none;
  }
  
  .modal-content {
    margin: 0.5rem;
    max-height: calc(100vh - 1rem);
  }
  
  .modal-table-label {
    width: 120px;
    padding: 0.75rem 1rem;
  }
  
  .modal-table-value {
    padding: 0.75rem 1rem;
  }
}
`;

// Componente Modal para detalles de la empresa
const EmpresaDetailModal = ({ empresa, isOpen, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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

  if (!isOpen || !empresa) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{empresa.empresa} - Detalle Completo</h2>
          <button onClick={onClose} className="modal-close" aria-label="Cerrar modal">×</button>
        </div>

        <div className="modal-body">
          <table className="modal-table">
            <tbody>
              <tr><td className="section-header" colSpan="2">INFORMACIÓN BÁSICA</td></tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Empresa</td>
                <td className="modal-table-value">{empresa.empresa}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Contacto</td>
                <td className="modal-table-value">{empresa.contacto}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Email</td>
                <td className="modal-table-value">{empresa.email}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Página Web</td>
                <td className="modal-table-value">
                  {empresa.pagina_web ? (
                    <a href={empresa.pagina_web} target="_blank" rel="noopener noreferrer">
                      {empresa.pagina_web}
                    </a>
                  ) : 'No especificada'}
                </td>
              </tr>

              <tr><td className="section-header" colSpan="2">CONTACTO</td></tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Teléfono Móvil</td>
                <td className="modal-table-value">{empresa.telefono_movil}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Teléfono Fijo</td>
                <td className="modal-table-value">{empresa.telefono_fijo}</td>
              </tr>

              <tr><td className="section-header" colSpan="2">UBICACIÓN</td></tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Dirección</td>
                <td className="modal-table-value">{empresa.direccion}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Ciudad</td>
                <td className="modal-table-value">{empresa.ciudad}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Provincia</td>
                <td className="modal-table-value">{empresa.provincia}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Código Postal</td>
                <td className="modal-table-value">{empresa.codigo_postal}</td>
              </tr>

              <tr><td className="section-header" colSpan="2">MAQUINARIA PRINCIPAL</td></tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Picadora Marca</td>
                <td className="modal-table-value">{empresa.picadora_marca || 'No especificada'}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Picadora Modelo</td>
                <td className="modal-table-value">{empresa.picadora_modelo || 'No especificado'}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Cabezal</td>
                <td className="modal-table-value">{empresa.cabezal || 'No especificado'}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Embolsadora</td>
                <td className="modal-table-value">{empresa.embolsadora || 'No especificada'}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Tractor</td>
                <td className="modal-table-value">{empresa.tractor || 'No especificado'}</td>
              </tr>

              <tr><td className="section-header" colSpan="2">VEHÍCULOS Y TRANSPORTE</td></tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Bateas</td>
                <td className="modal-table-value">{empresa.bateas || 'No especificadas'}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Carros</td>
                <td className="modal-table-value">{empresa.carros || 'No especificados'}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Camiones</td>
                <td className="modal-table-value">{empresa.camiones || 'No especificados'}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Carretones</td>
                <td className="modal-table-value">{empresa.carretones || 'No especificados'}</td>
              </tr>

              <tr><td className="section-header" colSpan="2">INFRAESTRUCTURA</td></tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Casillas</td>
                <td className="modal-table-value">{empresa.casillas || 'No especificadas'}</td>
              </tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Varios</td>
                <td className="modal-table-value">{empresa.varios || 'No especificado'}</td>
              </tr>

              <tr><td className="section-header" colSpan="2">SERVICIOS</td></tr>
              <tr className="modal-table-row">
                <td className="modal-table-label">Descripción</td>
                <td className="modal-table-value">{empresa.servicio}</td>
              </tr>
            </tbody>
          </table>
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
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        setLoading(true);
        
        const mockData = [
          {
            id: 1,
            empresa: 'Agropecuaria San Martín',
            contacto: 'Carlos Rodríguez',
            direccion: 'Ruta Nacional 9 Km 45',
            ciudad: 'Rosario',
            provincia: 'Santa Fe',
            codigo_postal: '2000',
            telefono_movil: '+54 9 341 123-4567',
            telefono_fijo: '+54 341 456-7890',
            email: 'contacto@agrosanmartin.com.ar',
            pagina_web: 'https://www.agrosanmartin.com.ar',
            servicio: 'Servicios de cosecha, picado y enfardado',
            picadora_marca: 'John Deere',
            picadora_modelo: '7800',
            cabezal: 'Drago 830',
            embolsadora: 'Richiger R450',
            tractor: 'New Holland T7.270',
            bateas: '3 unidades - 25 toneladas c/u',
            carros: '2 carros forrajeros',
            camiones: '1 Mercedes Benz 1719',
            casillas: '2 casillas móviles',
            carretones: '4 carretones hidráulicos',
            varios: 'Generador 15KW, compresor de aire'
          },
          {
            id: 2,
            empresa: 'Contratistas Rurales El Campo',
            contacto: 'María González',
            direccion: 'Av. San Martín 1234',
            ciudad: 'Venado Tuerto',
            provincia: 'Santa Fe',
            codigo_postal: '2600',
            telefono_movil: '+54 9 3462 55-1234',
            telefono_fijo: '+54 3462 42-5678',
            email: 'info@elcampo.com.ar',
            pagina_web: null,
            servicio: 'Picado de forrajes, siembra directa',
            picadora_marca: 'Claas',
            picadora_modelo: 'Jaguar 960',
            cabezal: 'Orbis 750',
            embolsadora: 'Mainero 2330',
            tractor: 'Case IH Magnum 340',
            bateas: '2 bateas autodescargables',
            carros: null,
            camiones: null,
            casillas: '1 casilla equipada',
            carretones: '2 carretones',
            varios: 'Equipo de soldadura móvil'
          },
          {
            id: 3,
            empresa: 'Servicios Agropecuarios Norte',
            contacto: 'Juan Pablo Martínez',
            direccion: 'Calle 25 de Mayo 567',
            ciudad: 'Rafaela',
            provincia: 'Santa Fe',
            codigo_postal: '2300',
            telefono_movil: '+54 9 3492 66-7890',
            telefono_fijo: '+54 3492 43-2109',
            email: 'servicios@agronorte.com.ar',
            pagina_web: 'https://www.agronorte.com.ar',
            servicio: 'Cosecha, picado, embolsado y transporte',
            picadora_marca: 'New Holland',
            picadora_modelo: 'FR9090',
            cabezal: 'New Holland 230FP',
            embolsadora: 'Akron E280',
            tractor: 'John Deere 8345R',
            bateas: '4 bateas de 30 toneladas',
            carros: '3 carros mixer',
            camiones: '2 camiones Scania P360',
            casillas: '3 casillas con baño',
            carretones: '6 carretones diversos',
            varios: 'Taller móvil completo, cisterna de combustible'
          }
        ];
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setEmpresas(mockData);
        setError(null);
      } catch (err) {
        setError('Error al cargar las empresas');
        console.error('Error fetching empresas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresas();
  }, []);

  const filteredEmpresas = useMemo(() => {
    if (!searchTerm) return empresas;
    
    return empresas.filter(empresa => 
      empresa.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.ciudad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.provincia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.servicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      empresa.id.toString().includes(searchTerm)
    );
  }, [empresas, searchTerm]);

  const handleViewDetail = (empresa) => {
    setSelectedEmpresa(empresa);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmpresa(null);
  };

  if (loading) {
    return (
      <div className="socios-container">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="socios-container">
        <div className="error-container">
          {error}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="socios-container">
        <div className="socios-header">
          <h1 className="socios-title">Gestión de Empresas de Servicios</h1>
          
          <div className="search-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="table-container">
          <div className="table-wrapper">
            <table className="socios-table">
              <thead className="table-header">
                <tr>
                  <th>Empresa</th>
                  <th>Contacto</th>
                  <th>Ciudad</th>
                  <th>Provincia</th>
                  <th>Servicio</th>
                  <th>Tel. Móvil</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmpresas.map((empresa) => (
                  <tr key={empresa.id} className="table-row">
                    <td className="table-cell">
                      <div className="empresa-name">
                        {empresa.empresa}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span>{empresa.contacto}</span>
                    </td>
                    <td className="table-cell">
                      <span>{empresa.ciudad}</span>
                    </td>
                    <td className="table-cell">
                      <span>{empresa.provincia}</span>
                    </td>
                    <td className="table-cell">
                      <span>
                        {empresa.servicio.length > 30 
                          ? empresa.servicio.substring(0, 30) + '...' 
                          : empresa.servicio}
                      </span>
                    </td>
                    <td className="table-cell">
                      <span>{empresa.telefono_movil}</span>
                    </td>
                    <td className="table-cell">
                      <button
                        onClick={() => handleViewDetail(empresa)}
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

          {filteredEmpresas.length === 0 && (
            <div className="empty-state">
              No se encontraron empresas
            </div>
            )}
        </div>

        <EmpresaDetailModal 
          empresa={selectedEmpresa}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default EmpresasTable;
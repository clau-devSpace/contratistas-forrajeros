import React, { useState, useEffect, useMemo } from 'react';
import './socios.css';

// Componente Modal para detalles del socio
const SocioDetailModal = ({ socio, isOpen, onClose }) => {
  // Cerrar modal al hacer clic en el overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Cerrar modal con ESC
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

  if (!isOpen || !socio) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Header del Modal */}
        <div className="modal-header">
          <button
            onClick={onClose}
            className="modal-close"
            aria-label="Cerrar modal"
          >
            ×
          </button>
          <div className="modal-header-content">
            <div className="modal-avatar">
              👤
            </div>
            <div>
              <h2 className="modal-title">{socio.nombre} {socio.apellido}</h2>
              <p className="modal-subtitle">Socio #{socio.id}</p>
            </div>
          </div>
        </div>

        {/* Contenido del Modal */}
        <div className="modal-body">
          {/* Información Personal */}
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">✉️</span>
              <div className="info-content">
                <p className="info-label">Email</p>
                <p className="info-value">{socio.email}</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div className="info-content">
                <p className="info-label">Teléfono</p>
                <p className="info-value">{socio.telefono}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon">📍</span>
              <div className="info-content">
                <p className="info-label">Dirección</p>
                <p className="info-value">{socio.direccion}</p>
                <p className="info-value">{socio.ciudad}, {socio.provincia}</p>
              </div>
            </div>
            
            <div className="info-item">
              <span className="info-icon">📅</span>
              <div className="info-content">
                <p className="info-label">Fecha de Alta</p>
                <p className="info-value">{new Date(socio.fecha_alta).toLocaleDateString('es-AR')}</p>
              </div>
            </div>
          </div>

          {/* Estado y Información Adicional */}
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-label">Estado</p>
              <span className={`status-badge ${socio.estado === 'activo' ? 'status-active' : 'status-inactive'}`}>
                {socio.estado}
              </span>
            </div>
            
            <div className="stat-card">
              <p className="stat-label">Categoría</p>
              <p className="stat-value">{socio.categoria}</p>
            </div>
            
            <div className="stat-card">
              <p className="stat-label">Cuota Mensual</p>
              <p className="stat-value">${socio.cuota_mensual}</p>
            </div>
          </div>

          {/* Observaciones */}
          {socio.observaciones && (
            <div className="observations">
              <h3 className="observations-title">Observaciones</h3>
              <p className="observations-content">{socio.observaciones}</p>
            </div>
          )}
        </div>

        {/* Footer del Modal */}
        <div className="modal-footer">
          <button onClick={onClose} className="btn-close">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principal de la tabla
const SociosTable = () => {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simulación de datos - aquí conectarías con tu API PHP
  useEffect(() => {
    const fetchSocios = async () => {
      try {
        setLoading(true);
        
        // Aquí harías la llamada real a tu API PHP
        // const response = await fetch('/api/socios.php');
        // const data = await response.json();
        
        // Datos de ejemplo para demostración
        const mockData = [
          {
            id: 1,
            nombre: 'Juan',
            apellido: 'Pérez',
            email: 'juan.perez@email.com',
            telefono: '+54 11 1234-5678',
            direccion: 'Av. Corrientes 1234',
            ciudad: 'Buenos Aires',
            provincia: 'CABA',
            estado: 'activo',
            categoria: 'Titular',
            cuota_mensual: 15000,
            fecha_alta: '2023-01-15',
            observaciones: 'Socio fundador con más de 20 años de antigüedad'
          },
          {
            id: 2,
            nombre: 'María',
            apellido: 'González',
            email: 'maria.gonzalez@email.com',
            telefono: '+54 11 9876-5432',
            direccion: 'Calle Falsa 456',
            ciudad: 'La Plata',
            provincia: 'Buenos Aires',
            estado: 'activo',
            categoria: 'Adherente',
            cuota_mensual: 10000,
            fecha_alta: '2023-03-20',
            observaciones: null
          },
          {
            id: 3,
            nombre: 'Carlos',
            apellido: 'Rodríguez',
            email: 'carlos.rodriguez@email.com',
            telefono: '+54 11 5555-1234',
            direccion: 'San Martín 789',
            ciudad: 'Rosario',
            provincia: 'Santa Fe',
            estado: 'inactivo',
            categoria: 'Titular',
            cuota_mensual: 15000,
            fecha_alta: '2022-08-10',
            observaciones: 'Suspendido por falta de pago. Contactar para regularizar situación.'
          },
          {
            id: 4,
            nombre: 'Ana',
            apellido: 'López',
            email: 'ana.lopez@email.com',
            telefono: '+54 11 7777-9999',
            direccion: 'Belgrano 321',
            ciudad: 'Córdoba',
            provincia: 'Córdoba',
            estado: 'activo',
            categoria: 'Familiar',
            cuota_mensual: 8000,
            fecha_alta: '2024-01-10',
            observaciones: 'Hija de socio titular. Descuento familiar aplicado.'
          }
        ];
        
        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSocios(mockData);
        setError(null);
      } catch (err) {
        setError('Error al cargar los socios');
        console.error('Error fetching socios:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSocios();
  }, []);

  // Filtrado de socios con useMemo para optimización
  const filteredSocios = useMemo(() => {
    if (!searchTerm) return socios;
    
    return socios.filter(socio => 
      socio.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      socio.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      socio.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      socio.id.toString().includes(searchTerm)
    );
  }, [socios, searchTerm]);

  const handleViewDetail = (socio) => {
    setSelectedSocio(socio);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSocio(null);
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
    <div className="socios-container">
      
      {/* Header y Búsqueda */}
      <div className="socios-header">
        <h1 className="socios-title">Gestión de Socios</h1>
        
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Buscar socios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="table-container">
        <div className="table-wrapper">
          <table className="socios-table">
            <thead className="table-header">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Estado</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSocios.map((socio) => (
                <tr key={socio.id} className="table-row">
                  <td className="table-cell">
                    <span className="socio-id">#{socio.id}</span>
                  </td>
                  <td className="table-cell">
                    <div className="socio-name">
                      {socio.nombre} {socio.apellido}
                    </div>
                  </td>
                  <td className="table-cell">
                    <span className="socio-email">{socio.email}</span>
                  </td>
                  <td className="table-cell">
                    <span className={`status-badge ${socio.estado === 'activo' ? 'status-active' : 'status-inactive'}`}>
                      {socio.estado}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className="socio-email">{socio.categoria}</span>
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={() => handleViewDetail(socio)}
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

        {filteredSocios.length === 0 && (
          <div className="empty-state">
            No se encontraron socios
          </div>
        )}
      </div>

      {/* Modal de Detalles */}
      <SocioDetailModal 
        socio={selectedSocio}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default SociosTable;
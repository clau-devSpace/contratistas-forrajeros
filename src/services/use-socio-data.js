import { useState } from 'react';
import apiService from './apiService';

export const useSocioData = () => {
  const [socioData, setSocioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar datos del socio usando ApiService
  const loadSocioData = async (socioId) => {
    if (!socioId) {
      setError('ID del socio es requerido');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.fetchSocioDetail(socioId);
      
      if (response.success && response.data) {
        setSocioData(response.data);
        
        // Log para debugging
        if (response.fromFallback) {
          console.log('Datos cargados desde fallback para desarrollo');
        } else {
          console.log('Datos cargados exitosamente desde API:', response.data);
        }
      } else {
        throw new Error('No se pudieron obtener los datos del socio');
      }
      
    } catch (err) {
      console.error('Error al cargar datos del socio:', err);
      setError(err.message || 'Error al cargar los datos del socio');
      setSocioData(null);
      
    } finally {
      setLoading(false);
    }
  };

  // Función para limpiar los datos
  const clearSocioData = () => {
    setSocioData(null);
    setError(null);
  };

  // Función para recargar los datos
  const reloadSocioData = (socioId) => {
    clearSocioData();
    loadSocioData(socioId);
  };

  // Función para formatear datos de equipamiento (usa la del ApiService)
  const formatEquipmentData = (equipmentArray, type = 'equipment') => {
    return apiService.formatEquipmentData(equipmentArray, type);
  };

  // Función para obtener información de contacto formateada
  const getContactInfo = () => {
    if (!socioData?.datosBase) return null;
    
    const { datosBase } = socioData;
    return {
      nombre: datosBase.nombre || '',
      contacto: datosBase.contacto || '',
      direccion: datosBase.direccion || '',
      ciudad: datosBase.ciudad || '',
      provincia: datosBase.provincia || '',
      codigoPostal: datosBase.codigo_postal || '',
      telefonoMovil: datosBase.telefono_movil || '',
      telefonoFijo: datosBase.telefono_fijo || '',
      email: datosBase.email || '',
      paginaWeb: datosBase.pagina_web || '',
      otros: datosBase.otros || ''
    };
  };

  // Función para obtener equipamiento organizado
  const getEquipmentSummary = () => {
    if (!socioData) return null;

    return {
      picadoras: formatEquipmentData(socioData.picadoras, 'equipment'),
      cabezales: formatEquipmentData(socioData.cabezales, 'equipment'),
      embolsadoras: formatEquipmentData(socioData.embolsadoras, 'equipment'),
      inventario: formatEquipmentData(socioData.inventario, 'inventario')
    };
  };

  // Función para obtener metadata
  const getMetadata = () => {
    return socioData?.metadata || null;
  };

  return {
    // Estado
    socioData,
    loading,
    error,
    
    // Funciones principales
    loadSocioData,
    clearSocioData,
    reloadSocioData,
    
    // Funciones utilitarias
    formatEquipmentData,
    getContactInfo,
    getEquipmentSummary,
    getMetadata,
    
    // Estado computado
    hasData: !!socioData,
    isEmpty: !loading && !error && !socioData
  };
};
import { useState, useCallback, useMemo } from 'react';
import apiService from './apiService';

export const useSocioData = () => {
  const [socioData, setSocioData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para cargar datos del socio usando ApiService
  const loadSocioData = useCallback(async (socioId) => {
    console.log('🚀 loadSocioData ejecutándose con:', socioId);
    if (!socioId) {
      console.log('❌ No se proporcionó socioId');
      setError('ID del socio es requerido');
      return;
    }

    console.log('⏳ Iniciando carga de datos...');
    setLoading(true);
    setError(null);
    
    try {
      console.log('📡 Llamando a apiService.fetchSocioDetail...');
      const response = await apiService.fetchSocioDetail(socioId);

      console.log('🔍 Respuesta completa de la API:', response);
      console.log('🔍 response.success:', response.success);
      console.log('🔍 response.data:', response.data);
      
      if (response.success && response.data) {
        console.log('✅ Datos válidos recibidos, actualizando estado...');
        setSocioData(response.data);
        
        // Log detallado de los datos
        console.log('📊 Datos estructurados:', {
          datosBase: response.data.datosBase,
          picadoras: response.data.picadoras,
          cabezales: response.data.cabezales,
          embolsadoras: response.data.embolsadoras,
          inventario: response.data.inventario,
          metadata: response.data.metadata
        });
        
        // Log para debugging
        if (response.fromFallback) {
          console.log('🔄 Datos cargados desde fallback para desarrollo');
        } else {
          console.log('🌐 Datos cargados exitosamente desde API remota');
        }
      } else {
        console.log('❌ Respuesta de API inválida:', response);
        throw new Error('No se pudieron obtener los datos del socio');
      }
      
    } catch (err) {
      console.error('💥 Error al cargar datos del socio:', err);
      setError(err.message || 'Error al cargar los datos del socio');
      setSocioData(null);
      
    } finally {
      console.log('🏁 Finalizando carga de datos');
      setLoading(false);
    }
  }, []);

  // Función para limpiar los datos
  const clearSocioData = useCallback(() => {
    console.log('🧹 Limpiando datos del socio');
    setSocioData(null);
    setError(null);
  }, []);

  // Función para recargar los datos
  const reloadSocioData = useCallback((socioId) => {
    console.log('🔄 Recargando datos del socio:', socioId);
    clearSocioData();
    loadSocioData(socioId);
  }, [clearSocioData, loadSocioData]);

  // Función para formatear datos de equipamiento (usa la del ApiService) - MEMOIZADA
  const formatEquipmentData = useCallback((equipmentArray, type = 'equipment') => {
    console.log('🔧 Formateando equipamiento desde hook:', { equipmentArray, type });
    const result = apiService.formatEquipmentData(equipmentArray, type);
    console.log('🎯 Resultado del formateo:', result);
    return result;
  }, []);

  // MEMOIZAR información de contacto para evitar recálculos
  const contactInfo = useMemo(() => {
    console.log('📞 [MEMOIZED] Calculando información de contacto...');
    
    if (!socioData?.datosBase) {
      console.log('❌ No hay datosBase disponibles');
      return null;
    }
    
    const { datosBase } = socioData;
    const info = {
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
    
    console.log('✅ [MEMOIZED] Información de contacto calculada:', info);
    return info;
  }, [socioData]); // Solo recalcular cuando cambie socioData

  // MEMOIZAR resumen de equipamiento para evitar recálculos
  const equipmentSummary = useMemo(() => {
    console.log('⚙️ [MEMOIZED] Calculando resumen de equipamiento...');
    
    if (!socioData) {
      console.log('❌ No hay socioData disponible');
      return null;
    }

    console.log('🔍 Datos brutos de equipamiento:', {
      picadoras: socioData.picadoras,
      cabezales: socioData.cabezales,
      embolsadoras: socioData.embolsadoras,
      inventario: socioData.inventario
    });

    const summary = {
      picadoras: formatEquipmentData(socioData.picadoras, 'equipment'),
      cabezales: formatEquipmentData(socioData.cabezales, 'equipment'),
      embolsadoras: formatEquipmentData(socioData.embolsadoras, 'equipment'),
      inventario: formatEquipmentData(socioData.inventario, 'inventario')
    };

    console.log('✅ [MEMOIZED] Resumen de equipamiento calculado:', summary);
    return summary;
  }, [socioData, formatEquipmentData]); // Solo recalcular cuando cambien las dependencias

  // MEMOIZAR metadata para evitar recálculos
  const metadata = useMemo(() => {
    const meta = socioData?.metadata || null;
    console.log('📊 [MEMOIZED] Metadata calculada:', meta);
    return meta;
  }, [socioData]);

  // FUNCIONES LEGACY PARA MANTENER COMPATIBILIDAD (ahora solo retornan los valores memoizados)
  const getContactInfo = useCallback(() => {
    console.log('📞 getContactInfo called (usando valor memoizado)');
    return contactInfo;
  }, [contactInfo]);

  const getEquipmentSummary = useCallback(() => {
    console.log('⚙️ getEquipmentSummary called (usando valor memoizado)');
    return equipmentSummary;
  }, [equipmentSummary]);

  const getMetadata = useCallback(() => {
    console.log('📊 getMetadata called (usando valor memoizado)');
    return metadata;
  }, [metadata]);

  // Estado computado memoizado
  const hasData = useMemo(() => !!socioData, [socioData]);
  const isEmpty = useMemo(() => !loading && !error && !socioData, [loading, error, socioData]);

  // Log del estado actual solo cuando cambie algo importante
  console.log('🔍 Estado actual del hook useSocioData:', {
    hasSocioData: hasData,
    loading,
    error,
    socioDataKeys: socioData ? Object.keys(socioData) : null
  });

  return {
    // Estado
    socioData,
    loading,
    error,
    
    // Funciones principales
    loadSocioData,
    clearSocioData,
    reloadSocioData,
    
    // Funciones utilitarias (legacy - mantener compatibilidad)
    formatEquipmentData,
    getContactInfo,
    getEquipmentSummary,
    getMetadata,
    
    // Valores memoizados (recomendado usar estos directamente)
    contactInfo,
    equipmentSummary,
    metadata,
    
    // Estado computado
    hasData,
    isEmpty
  };
};
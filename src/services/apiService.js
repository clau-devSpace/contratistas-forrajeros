class ApiService {
  constructor() {
    // Configuración base de la API
    this.baseUrl = 'http://localhost:3001/api';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    
    // Flag para determinar si usar datos locales o API real
    this.useLocalData = true; // Cambia a false cuando tengas la API lista
    
    // Debug flag
    this.debug = true;
    
    // Cache para evitar cargar el JSON múltiples veces
    this.empresasCache = null;
  }

  // Método de debug
  log(...args) {
    if (this.debug) {
      console.log('[ApiService]', ...args);
    }
  }

  // Método auxiliar para hacer peticiones HTTP
  async makeRequest(url, options = {}) {
    try {
      this.log('Making request to:', url);
      const response = await fetch(url, {
        headers: { ...this.defaultHeaders, ...options.headers },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.log('Request successful:', url);
      return data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Cargar datos desde JSON en public/data/ con cache
  async loadEmpresasData() {
    if (this.empresasCache) {
      this.log('Using cached empresas data');
      return this.empresasCache;
    }

    try {
      this.log('Loading empresas.json from server');
      const response = await fetch('/data/empresas.json');
      if (!response.ok) {
        throw new Error(`Error loading empresas.json: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      
      // Cachear los datos
      this.empresasCache = data.empresas || data;
      this.log('Successfully loaded and cached empresas.json:', this.empresasCache.length, 'empresas');
      return this.empresasCache;
    } catch (error) {
      console.error('Error loading empresas.json:', error);
      throw error;
    }
  }

  // Simular retraso de red
  async simulateNetworkDelay(ms = 300) {
    this.log(`Simulating network delay: ${ms}ms`);
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Obtener lista paginada de empresas
  async fetchEmpresas({ page = 1, limit = 20, search = '' } = {}) {
    this.log('fetchEmpresas called with:', { page, limit, search });
    
    if (this.useLocalData) {
      try {
        // Cargar desde JSON local
        const allData = await this.loadEmpresasData();
        await this.simulateNetworkDelay(300);
        
        // Aplicar filtros y paginación
        return this.processEmpresasData(allData, { page, limit, search });
      } catch (error) {
        this.log('Error in fetchEmpresas:', error);
        throw error;
      }
    } else {
      // Llamada real a la API PHP
      const queryParams = new URLSearchParams({ page, limit, search });
      return await this.makeRequest(`${this.baseUrl}/empresas?${queryParams}`);
    }
  }

  // Procesar datos de empresas (filtros y paginación)
  processEmpresasData(allData, { page, limit, search }) {
    this.log('Processing empresas data:', { totalItems: allData.length, page, limit, search });
    
    // Filtrar por búsqueda
    const filtered = search 
      ? allData.filter(empresa => 
          empresa.empresa?.toLowerCase().includes(search.toLowerCase()) ||
          empresa.contacto?.toLowerCase().includes(search.toLowerCase()) ||
          empresa.ciudad?.toLowerCase().includes(search.toLowerCase()) ||
          empresa.provincia?.toLowerCase().includes(search.toLowerCase()) ||
          empresa.servicio?.toLowerCase().includes(search.toLowerCase()) ||
          empresa.email?.toLowerCase().includes(search.toLowerCase()) ||
          empresa.id?.toString().includes(search)
        )
      : allData;

    // Paginar
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filtered.slice(startIndex, endIndex);

    const result = {
      data: paginatedData,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(filtered.length / limit),
        totalItems: filtered.length,
        itemsPerPage: limit,
        hasNextPage: endIndex < filtered.length,
        hasPrevPage: page > 1
      }
    };

    this.log('Processed data result:', result);
    return result;
  }

  // Generar datos adicionales simulados para el detalle
  generateAdditionalData(empresa) {
    // Usar el ID para generar datos consistentes (siempre los mismos para la misma empresa)
    const seed = empresa.id;
    
    // Función para generar números pseudo-aleatorios basados en seed
    const seededRandom = (seed, min, max) => {
      const x = Math.sin(seed) * 10000;
      const random = x - Math.floor(x);
      return Math.floor(random * (max - min + 1)) + min;
    };

    // Generar datos consistentes basados en el ID
    const tractores = seededRandom(seed, 2, 8);
    const camiones = seededRandom(seed * 2, 3, 12);
    const implementos = seededRandom(seed * 3, 5, 20);
    const calificacion = (seededRandom(seed * 4, 35, 50) / 10).toFixed(1); // Entre 3.5 y 5.0
    const experiencia = seededRandom(seed * 5, 5, 25);

    // Arrays de equipamiento para variar
    const maquinariaPrincipal = [
      ['Picadora New Holland FR780', 'Tractor John Deere 8320R', 'Embolsadora Akron E280'],
      ['Picadora Case IH FX50', 'Tractor Massey Ferguson 8737', 'Mixer Kuhn SPV 12'],
      ['Picadora Claas Jaguar 980', 'Tractor Fendt 939', 'Rotoenfardadora Case IH RB565'],
      ['Picadora Krone Big X 1180', 'Tractor Valtra T254', 'Henificadora Kuhn GA 9032'],
      ['Picadora John Deere 9700i', 'Tractor Case IH Magnum 380', 'Acondicionadora Kuhn FC 883']
    ];

    const maquinariaIndex = seed % maquinariaPrincipal.length;

    // Servicios detallados según el tipo de empresa
    const serviciosDetallados = [
      'Picado de forrajes verdes (maíz, sorgo, alfalfa)',
      'Confección de silajes de planta entera',
      'Picado y embolsado en silo bolsa',
      'Transporte de forraje picado',
      'Asesoramiento en conservación de forrajes',
      'Mantenimiento de equipos de picado'
    ];

    return {
      // Datos originales de la empresa
      ...empresa,
      
      // Información adicional generada
      telefono_fijo: empresa.telefono?.replace('9 ', '') || 'No especificado',
      descripcion: `Empresa especializada en servicios de picado de forrajes con ${experiencia} años de experiencia en la región. Ofrecemos servicios integrales con equipamiento de última generación.`,
      
      // Equipamiento
      equipamiento: {
        maquinaria_principal: maquinariaPrincipal[maquinariaIndex]
      },
      
      // Inventario
      inventario: {
        tractores: tractores,
        camiones: camiones,
        implementos: implementos
      },
      
      // Maquinaria específica (simulada)
      picadora_marca: maquinariaPrincipal[maquinariaIndex][0].split(' ')[1],
      picadora_modelo: maquinariaPrincipal[maquinariaIndex][0].split(' ')[2] || 'FR780',
      cabezal: seededRandom(seed * 6, 6, 12) + ' surcos',
      embolsadora: maquinariaPrincipal[maquinariaIndex][2] || 'Akron E280',
      tractor: maquinariaPrincipal[maquinariaIndex][1],
      
      // Vehículos y transporte
      bateas: seededRandom(seed * 7, 2, 6) + ' unidades',
      carros: seededRandom(seed * 8, 1, 4) + ' unidades',
      carretones: seededRandom(seed * 9, 3, 8) + ' unidades',
      
      // Infraestructura
      casillas: seededRandom(seed * 10, 1, 3) + ' móviles',
      varios: 'Taller móvil, herramientas especializadas, repuestos',
      
      // Datos de negocio
      zona_cobertura: `${empresa.ciudad} y localidades vecinas (radio 50km)`,
      calificacion: calificacion,
      años_experiencia: experiencia,
      trabajos_completados: seededRandom(seed * 11, 50, 500),
      temporada_alta: 'Octubre a Abril (campaña de forrajes)',
      horario_atencion: 'Lunes a Viernes 7:00-19:00, Sábados 8:00-13:00',
      
      // Servicios detallados
      servicios_detallados: serviciosDetallados
    };
  }

  // Obtener detalles completos de una empresa específica
  async fetchEmpresaDetail(id) {
    this.log(`fetchEmpresaDetail called with ID: ${id}`);
    
    if (this.useLocalData) {
      try {
        await this.simulateNetworkDelay(200);
        
        // Cargar datos de empresas
        const allEmpresas = await this.loadEmpresasData();
        
        // Buscar la empresa por ID
        const empresa = allEmpresas.find(emp => emp.id == id);
        
        if (!empresa) {
          throw new Error(`Empresa con ID ${id} no encontrada`);
        }
        
        this.log('Found empresa:', empresa);
        
        // Generar datos adicionales para el detalle
        const detailedData = this.generateAdditionalData(empresa);
        
        this.log('Generated detailed data:', detailedData);
        return detailedData;
        
      } catch (error) {
        this.log('Error in fetchEmpresaDetail:', error);
        throw error;
      }
    } else {
      // Llamada real a PHP
      return await this.makeRequest(`${this.baseUrl}/empresas/${id}`);
    }
  }

  // Crear nueva empresa
  async createEmpresa(empresaData) {
    this.log('createEmpresa called with:', empresaData);
    
    if (this.useLocalData) {
      await this.simulateNetworkDelay(500);
      
      // Simular respuesta exitosa
      const result = {
        id: Date.now(), // ID temporal
        ...empresaData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      // Invalidar cache para reflejar el cambio
      this.empresasCache = null;
      
      this.log('Created empresa:', result);
      return result;
    } else {
      // Llamada real a PHP
      return await this.makeRequest(`${this.baseUrl}/empresas`, {
        method: 'POST',
        body: JSON.stringify(empresaData)
      });
    }
  }

  // Actualizar empresa existente
  async updateEmpresa(id, empresaData) {
    this.log('updateEmpresa called with:', { id, empresaData });
    
    if (this.useLocalData) {
      await this.simulateNetworkDelay(400);
      
      const result = {
        id,
        ...empresaData,
        updated_at: new Date().toISOString()
      };
      
      // Invalidar cache
      this.empresasCache = null;
      
      this.log('Updated empresa:', result);
      return result;
    } else {
      // Llamada real a PHP
      return await this.makeRequest(`${this.baseUrl}/empresas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(empresaData)
      });
    }
  }

  // Eliminar empresa
  async deleteEmpresa(id) {
    this.log('deleteEmpresa called with ID:', id);
    
    if (this.useLocalData) {
      await this.simulateNetworkDelay(300);
      
      // Simular eliminación exitosa
      const result = {
        success: true,
        message: 'Empresa eliminada correctamente',
        deletedId: id
      };
      
      // Invalidar cache
      this.empresasCache = null;
      
      this.log('Deleted empresa:', result);
      return result;
    } else {
      // Llamada real a PHP
      return await this.makeRequest(`${this.baseUrl}/empresas/${id}`, {
        method: 'DELETE'
      });
    }
  }

  // Obtener estadísticas generales
  async fetchStats() {
    this.log('fetchStats called');
    
    if (this.useLocalData) {
      await this.simulateNetworkDelay(200);
      
      try {
        // Calcular estadísticas desde el JSON
        const empresas = await this.loadEmpresasData();
        const result = {
          total_empresas: empresas.length,
          empresas_activas: empresas.length, // Asumimos que todas están activas
          servicios_disponibles: [...new Set(empresas.map(emp => emp.servicio))].length,
          ciudades_cubiertas: [...new Set(empresas.map(emp => emp.ciudad))].length,
          provincias_cubiertas: [...new Set(empresas.map(emp => emp.provincia))].length
        };
        
        this.log('Stats calculated:', result);
        return result;
      } catch (error) {
        this.log('Error calculating stats:', error);
        throw error;
      }
    } else {
      return await this.makeRequest(`${this.baseUrl}/stats`);
    }
  }

  // Limpiar cache manualmente
  clearCache() {
    this.empresasCache = null;
    this.log('Cache cleared');
  }

  // Cambiar modo de funcionamiento
  toggleMode(useLocal = true) {
    this.useLocalData = useLocal;
    console.log(`Modo ${useLocal ? 'desarrollo (local)' : 'producción (API)'} activado`);
  }

  // Obtener modo actual
  getCurrentMode() {
    return this.useLocalData ? 'local' : 'api';
  }

  // Configurar URL base manualmente
  setBaseUrl(url) {
    this.baseUrl = url;
    console.log(`URL base configurada: ${url}`);
  }

  // Activar/desactivar debug
  setDebug(enabled = true) {
    this.debug = enabled;
    console.log(`Debug ${enabled ? 'activado' : 'desactivado'}`);
  }
}

// Crear instancia singleton
const apiService = new ApiService();

export default apiService;
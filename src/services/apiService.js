class ApiService {
  constructor() {
    // URLs directas de producción (sin proxy)
    this.baseUrl = 'https://ensiladores.com.ar/InfoSocios/API_Socios.php';
    this.detailUrl = 'https://ensiladores.com.ar/InfoSocios/API_Socios_Detalle.php';
    
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.debug = true;
  }

  log(...args) {
    if (this.debug) {
      console.log('[ApiService]', ...args);
    }
  }

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
      this.log('API Request failed:', error);
      throw new Error(`Error de conexión: ${error.message}`);
    }
  }

  async fetchEmpresas(params = {}) {
    this.log(`fetchEmpresas called with params:`, params);

    const { search = '' } = params;

    try {
      const response = await this.makeRequest(this.baseUrl);
      console.log('🔍 Raw API response:', response);

      const empresas = Array.isArray(response) ? response : (response.empresas || response.data || []);

      this.log('Raw API response count:', empresas.length);

      let filteredEmpresas = empresas;
      if (search && search.trim()) {
        const searchTerm = search.toLowerCase().trim();
        filteredEmpresas = empresas.filter(empresa =>
          (empresa.empresa && empresa.empresa.toLowerCase().includes(searchTerm)) ||
          (empresa.contacto && empresa.contacto.toLowerCase().includes(searchTerm)) ||
          (empresa.ciudad && empresa.ciudad.toLowerCase().includes(searchTerm)) ||
          (empresa.provincia && empresa.provincia.toLowerCase().includes(searchTerm)) ||
          (empresa.servicio && empresa.servicio.toLowerCase().includes(searchTerm))
        );
      }

      this.log('Filtered empresas count:', filteredEmpresas.length);

      return {
        data: filteredEmpresas,
        total: filteredEmpresas.length
      };

    } catch (error) {
      this.log('Error fetching empresas:', error);
      throw error;
    }
  }

  async fetchSocioDetail(socioId) {
    this.log(`fetchSocioDetail called with ID:`, socioId);

    if (!socioId) {
      throw new Error('ID del socio es requerido');
    }

    try {
      const response = await this.makeRequest(`${this.detailUrl}/${socioId}`);
      this.log('Socio detail response:', response);

      // Validar que la respuesta tenga la estructura esperada
      if (!response || typeof response !== 'object') {
        throw new Error('Respuesta inválida del servidor');
      }

      return {
        data: response,
        success: true
      };

    } catch (error) {
      this.log('Error fetching socio detail:', error);
      throw error;
    }
  }

  // Función utilitaria para formatear datos de equipamiento
  formatEquipmentData(equipmentArray, type = 'equipment') {
    console.log('🔧 formatEquipmentData ejecutándose:', { equipmentArray, type });
    
    if (!equipmentArray || !Array.isArray(equipmentArray)) {
      console.log('❌ equipmentArray no es válido:', equipmentArray);
      return [];
    }
    
    const formattedData = equipmentArray
      .map((item, index) => {
        console.log(`🔍 Procesando item ${index}:`, item);
        
        const keys = Object.keys(item);
        console.log(`🔑 Keys encontradas:`, keys);
        
        const marcaKey = keys.find(k => k.startsWith('marca'));
        const modeloKey = type === 'inventario' 
          ? keys.find(k => k.startsWith('nombre'))
          : keys.find(k => k.startsWith('modelo'));
        const cantKey = keys.find(k => k.startsWith('cant'));
        
        console.log(`🎯 Keys seleccionadas:`, { marcaKey, modeloKey, cantKey });
        console.log(`🔍 Valores extraídos:`, { 
          marca: item[marcaKey], 
          modelo: item[modeloKey], 
          cantidad: item[cantKey] 
        });
        
        if (type === 'inventario') {
          const result = {
            nombre: item[modeloKey] || '',
            cantidad: item[cantKey] || ''
          };
          console.log(`📦 Resultado inventario:`, result);
          return result;
        } else {
          const result = {
            marca: item[marcaKey] || '',
            modelo: item[modeloKey] || ''
          };
          console.log(`⚙️ Resultado equipment:`, result);
          return result;
        }
      })
      .filter(item => {
        // Validar ambos campos para inventario
        const isValid = type === 'inventario' 
          ? (item.nombre && item.nombre.trim() !== '' && item.cantidad && item.cantidad.trim() !== '') 
          : (item.marca && item.marca.trim() !== '' && item.modelo && item.modelo.trim() !== '');
        
        console.log(`✅ Item válido:`, { item, isValid });
        return isValid;
      });

    console.log(`🎉 Datos formateados finales (${type}):`, formattedData);
    return formattedData;
  }
}

const apiService = new ApiService();
export default apiService;
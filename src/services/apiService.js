class ApiService {
  constructor() {
    this.baseUrl = 'https://ensiladores.com.ar/WebNEW/public/data/API_Socios.php';
    this.proxyUrl = '/api/socios';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.debug = true;
    this.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }

  log(...args) {
    if (this.debug) {
      console.log('[ApiService]', ...args);
    }
  }

  async makeRequest(url, options = {}) {
    try {
      this.log('Making request to:', url);

      let finalUrl = url;
      if (this.isDevelopment && url.includes('ensiladores.com.ar')) {
        finalUrl = this.proxyUrl;
        this.log('Using proxy URL in development:', finalUrl);
      }

      const response = await fetch(finalUrl, {
        headers: { ...this.defaultHeaders, ...options.headers },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      this.log('Request successful:', finalUrl, data);
      return data;

    } catch (error) {
      this.log('API Request failed:', error);
      throw error;
    }
  }

  // Obtener lista completa de empresas
  async fetchEmpresas(params = {}) {
    this.log(`fetchEmpresas called with params:`, params);

    const { search = '' } = params;

    try {
      // Obtener todos los datos de la API
      const response = await this.makeRequest(`${this.baseUrl}`);
      const empresas = Array.isArray(response) ? response : (response.empresas || response.data || []);

      this.log('Raw API response:', empresas);

      // Filtrar por búsqueda si hay término de búsqueda
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

      this.log('Filtered empresas:', filteredEmpresas);

      // Devolver estructura simple sin paginación
      return {
        data: filteredEmpresas,
        total: filteredEmpresas.length
      };

    } catch (error) {
      this.log('Error fetching empresas:', error);
      throw error;
    }
  }

  // Obtener detalle de una empresa específica
  async fetchEmpresaDetail(id) {
    this.log(`fetchEmpresaDetail called with ID: ${id}`);

    try {
      // Para el detalle, usar la URL específica con el ID
      const detailUrl = `${this.baseUrl}/${id}`;
      const response = await this.makeRequest(detailUrl);

      this.log('Detail API response (before adaptation):', response);

      return this.adaptEmpresaDetailResponse(response);

    } catch (error) {
      this.log('Error fetching empresa detail:', error);
      throw error;
    }
  }

  adaptEmpresaDetailResponse(apiResponse) {
    this.log('Adapting empresa detail response (input):', apiResponse);

    // *** INICIO DE LA MODIFICACIÓN CLAVE ***
    // Si la respuesta contiene una propiedad 'empresas' que es un array,
    // intenta tomar el primer elemento de ese array como la empresa de detalle.
    if (apiResponse && Array.isArray(apiResponse.empresas) && apiResponse.empresas.length > 0) {
      this.log('Response contains an "empresas" array, taking the first item.');
      return apiResponse.empresas[0]; // <--- ¡Esta es la línea crucial!
    }
    // *** FIN DE LA MODIFICACIÓN CLAVE ***

    // Lógica existente: Si la respuesta ya es la empresa directamente
    if (apiResponse && (apiResponse.id || apiResponse.empresa)) {
      this.log('Response seems to be direct empresa data or has "empresa" property.');
      return apiResponse;
    }

    // Lógica existente: Si viene envuelta en una propiedad genérica (data, etc.)
    const empresaData = apiResponse.empresa || apiResponse.data || apiResponse;

    if (!empresaData) {
      this.log('Error: Invalid response format, empresaData is null/undefined.');
      throw new Error('Formato de respuesta inválido');
    }

    this.log('Adapted data (final output):', empresaData);
    return empresaData;
  }
}

const apiService = new ApiService();
export default apiService;
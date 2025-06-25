class ApiService {
  constructor() {
    
    this.baseUrl = this.getApiUrl();
    this.proxyUrl = '/api/socios';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.debug = true;
    this.isDevelopment = this.detectDevelopment();
  }

  detectDevelopment() {
    const hostname = window.location.hostname;
    const port = window.location.port;
    
    return hostname === 'localhost' || 
           hostname === '127.0.0.1' || 
           hostname === '0.0.0.0' ||
           port === '3000' || 
           port === '5173' || 
           port === '8080' ||
           hostname.includes('localhost');
  }

  getApiUrl() {
    const currentUrl = window.location;
    
    if (this.detectDevelopment()) {
      return 'https://ensiladores.com.ar/WebNEW/public/data/API_Socios.php';
    }
    
    // En producción, construir URL relativa al dominio actual
    const protocol = currentUrl.protocol;
    const hostname = currentUrl.hostname;
    
    // Intentar diferentes posibles ubicaciones de la API
    const possiblePaths = [
      '/WebNEW/public/data/API_Socios.php',
      '/public/data/API_Socios.php',
      '/data/API_Socios.php',
      '/api/API_Socios.php'
    ];
    
    // Por defecto, usar la primera opción
    return `${protocol}//${hostname}${possiblePaths[0]}`;
  }

  log(...args) {
    if (this.debug) {
      console.log('[ApiService]', ...args);
    }
  }

  async makeRequest(url, options = {}) {
    try {
      this.log('Making request to:', url);
      this.log('Environment - isDevelopment:', this.isDevelopment);
      this.log('Current location:', window.location.href);

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
      
      // Fallback: intentar con URL alternativa si es el primer intento
      if (!options._isRetry && !this.isDevelopment) {
        this.log('Attempting fallback URL...');
        const fallbackUrl = '/WebNEW/public/data/API_Socios.php';
        return this.makeRequest(fallbackUrl, { ...options, _isRetry: true });
      }
      
      throw error;
    }
  }

  async makeRequestDetail(url, options = {}) {
    try {
      this.log('Making request to:', url);
      
      let finalUrl = url;
      
      if (this.isDevelopment) {
        finalUrl = url;
      } else {
        // Construir URL con ID para producción
        const idMatch = url.match(/\/api\/socios\/(\d+)$/);
        if (idMatch) {
          const id = idMatch[1];
          finalUrl = `${this.baseUrl}?id=${id}`;
          this.log('Production URL for detail:', finalUrl);
        } else {
          finalUrl = this.baseUrl;
        }
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

  async fetchEmpresas(params = {}) {
    this.log(`fetchEmpresas called with params:`, params);

    const { search = '' } = params;

    try {
      const response = await this.makeRequest(this.baseUrl);
      const empresas = Array.isArray(response) ? response : (response.empresas || response.data || []);

      this.log('Raw API response:', empresas);

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

      return {
        data: filteredEmpresas,
        total: filteredEmpresas.length
      };

    } catch (error) {
      this.log('Error fetching empresas:', error);
      throw error;
    }
  }

  async fetchEmpresaDetail(id) {
    this.log(`fetchEmpresaDetail called with ID: ${id}`);

    try {
      const detailUrl = `${this.proxyUrl}/${id}`;
      const response = await this.makeRequestDetail(detailUrl);
      return this.adaptEmpresaDetailResponse(response);
    } catch (error) {
      this.log('Error fetching empresa detail:', error);
      throw error;
    }
  }

  adaptEmpresaDetailResponse(apiResponse) {
    this.log('Adapting empresa detail response (input):', apiResponse);

    if (apiResponse && Array.isArray(apiResponse.empresas) && apiResponse.empresas.length > 0) {
      this.log('Response contains an "empresas" array, taking the first item.');
      return apiResponse.empresas[0];
    }

    if (apiResponse && (apiResponse.id || apiResponse.empresa)) {
      this.log('Response seems to be direct empresa data or has "empresa" property.');
      return apiResponse;
    }

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
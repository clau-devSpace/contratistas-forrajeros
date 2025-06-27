class ApiService {
  constructor() {
    this.baseUrl = 'https://ensiladores.com.ar/InfoSocios/API_Socios.php/';
    this.detailUrl = 'https://ensiladores.com.ar/InfoSocios/API_Socios_Detalle.php/';
    this.proxyUrl = '/api/socios';
    this.proxyDetailUrl = '/api/socios/detalle';
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
        // Determinar qué proxy usar basado en la URL
        if (url.includes('API_Socios_Detalle.php')) {
          finalUrl = this.proxyDetailUrl;
          // Si hay un ID en la URL, agregarlo al proxy
          const idMatch = url.match(/API_Socios_Detalle\.php\/(\d+)/);
          if (idMatch) {
            finalUrl = `${this.proxyDetailUrl}/${idMatch[1]}`;
          }
        } else {
          finalUrl = this.proxyUrl;
        }
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
      this.log('Request successful:', finalUrl);
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
      const response = await this.makeRequest(`${this.baseUrl}`);
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
      const response = await this.makeRequest(`${this.detailUrl}${socioId}`);
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
      
      // En caso de error, retornar datos de fallback para desarrollo/testing
      if (this.isDevelopment) {
        this.log('Using fallback data for development...');
        return {
          data: this.getFallbackSocioData(socioId),
          success: true,
          fromFallback: true
        };
      }
      
      throw error;
    }
  }

  // Datos de fallback para desarrollo/testing
  getFallbackSocioData(socioId) {
    return {
      "datosBase": {
        "nombre": "Duckas SRL",
        "contacto": "Aguirre Saravia Patricio",
        "direccion": "Lisandro de la Torre 125",
        "ciudad": "Carlos Casares",
        "provincia": "Buenos Aires",
        "codigo_postal": "6530",
        "telefono_movil": "+54 9 2396 62-3266",
        "telefono_fijo": "(02395) 450060",
        "email": "patricio@duckas.com.ar",
        "pagina_web": "http://www.duckas.com.ar",
        "otros": "Equipamiento para pasturas: Todas las picadoras tienen recolectores de pasturas, más 1 cabezal Direct Disc para corte directo; 2 rastrillos Claas Liner Twin 1550; 1 Cortahileradora New Holland 1411; 1 Cortahileradora automotriz New Holland modelo 8060 c cabezal de corte de discos y otro de corte secuencial para alfalfas ó variedades de semillas.; 1 Cortahileradora automotriz New Holland modelo HW 340 c cabezal de corte de discos.; 2 Cortahileradoras automotrices New Holland modelo 1118 c cabezal de corte secuencial.; 1 Cabezal Claas Corto 8100 de 8,10 mts ancho de labor con corte de discos.; 4 Tractores de 115 hp para corte e hilerado.; 1 Mega enfardadora New Holand BB 9070, para fardos de hasta 1 ton. 2 Camiones para servicio en el campo con equipo completo de lubricación por aire comprimido, generadores 220/380v; 2 Torres de iluminación con generador propio para trabajos nocturnos;2 Carretones semirremolque para traslado de equipos.; 7 camionetas para apoyo logístico, todas las máquinas y equipos con comunicación VHF.; 2 Camiones regadores con tanque de 8000 lts c/u; 1 Motoniveladora Caterpillar; 1 Retroexcavadora sobre orugas, Caterpillar 215; 1 Topadora de orugas D 5; 2 Retropalas Caterpillar 416; 3 Grupos electrógenos portatiles de 40 kva c/u."
      },
      "picadoras": [
        { "marca1": "CLAAS", "modelo1": "Jaguar 980" },
        { "marca2": "CLAAS", "modelo2": "Jaguar 980" },
        { "marca3": "CLAAS", "modelo3": "Jaguar 980" },
        { "marca4": "CLAAS", "modelo4": "Jaguar 960" },
        { "marca5": "CLAAS", "modelo5": "Jaguar 990" },
        { "marca6": "", "modelo6": "" }
      ],
      "cabezales": [
        { "marca1": "CLAAS", "modelo1": "ORBIS 900 Seaflex" },
        { "marca2": "CLAAS", "modelo2": "ORBIS 900" },
        { "marca3": "CLAAS", "modelo3": "ORBIS 750 Seaflex" },
        { "marca4": "KRONE", "modelo4": "Easycollect 900" },
        { "marca5": "KRONE", "modelo5": "Easycollect 900" },
        { "marca6": "CLAAS", "modelo6": "PU 300" }
      ],
      "embolsadoras": [
        { "marca1": "AGBAG", "modelo1": "8100" },
        { "marca2": "Green Pac", "modelo2": "10-250" },
        { "marca3": "Green Pac", "modelo3": "9-180" },
        { "marca4": "Green Pac", "modelo4": "9-180" },
        { "marca5": "Green Pac", "modelo5": "9-180" },
        { "marca6": "", "modelo6": "" }
      ],
      "inventario": [
        { "nombre1": "Tractor", "cant1": "6" },
        { "nombre2": "Bateas", "cant2": "3" },
        { "nombre3": "Carros", "cant3": "6" },
        { "nombre4": "Camiones", "cant4": "25" },
        { "nombre5": "Casillas", "cant5": "12" },
        { "nombre6": "Carretones", "cant6": "6" },
        { "nombre7": "Carretones", "cant7": "6" }
      ],
      "metadata": {
        "total_empresas": 1,
        "fecha_extraccion": new Date().toISOString().split('T')[0],
        "descripcion": `Detalle de la empresa ID: ${socioId}`
      }
    };
  }

  // Función utilitaria para formatear datos de equipamiento
  formatEquipmentData(equipmentArray, type = 'equipment') {
    if (!equipmentArray || !Array.isArray(equipmentArray)) return [];
    
    return equipmentArray
      .map(item => {
        const keys = Object.keys(item);
        const marcaKey = keys.find(k => k.startsWith('marca'));
        const modeloKey = keys.find(k => k.startsWith('modelo')) || keys.find(k => k.startsWith('nombre'));
        const cantKey = keys.find(k => k.startsWith('cant'));
        
        if (type === 'inventario') {
          return {
            nombre: item[modeloKey],
            cantidad: item[cantKey]
          };
        } else {
          return {
            marca: item[marcaKey],
            modelo: item[modeloKey]
          };
        }
      })
      .filter(item => type === 'inventario' ? item.nombre : (item.marca && item.modelo));
  }
}

const apiService = new ApiService();
export default apiService;
class ApiService {
  constructor() {
    this.baseUrl = '/data'; // Para JSONs locales
    this.apiUrl = '/api'; // Para APIs externas
  }

  // Método existente para JSONs locales
  async obtenerDatos(endpoint) {
    const response = await fetch(`${this.baseUrl}/${endpoint}.json`);
    if (!response.ok) {
      throw new Error(`Error al cargar ${endpoint}`);
    }
    return response.json();
  }

  /* Nuevo método para API Eco PF
  async obtenerPreciosReferencia() {
    const response = await fetch(`${this.apiUrl}/eco-pf`);
    if (!response.ok) {
      throw new Error('Error al cargar datos de Eco PF');
    }
    return response.json();
  }*/

     async obtenerPreciosReferencia() {
    const response = await fetch('https://ensiladores.com.ar/infoSocios/API_EcoPF.php');
    if (!response.ok) {
      throw new Error('Error al cargar datos de Eco PF');
    }
    return response.json();
  }

  /* Nuevo método para API Eco CS
  async obtenerEcoCS() {
    const response = await fetch(`${this.apiUrl}/eco-cs`);
    if (!response.ok) {
      throw new Error('Error al cargar datos de Eco CS');
    }
    return response.json();
  } */

     async obtenerEcoCS() {
    const response = await fetch('https://ensiladores.com.ar/infoSocios/API_EcoCS.php');
    if (!response.ok) {
      throw new Error('Error al cargar datos de Eco CS');
    }
    return response.json();
  }

  // Método genérico para cualquier endpoint de API externa (opcional)
  async obtenerDatosAPI(endpoint) {
    const response = await fetch(`${this.apiUrl}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error al cargar API ${endpoint}`);
    }
    return response.json();
  }
}

export const apiServiceEconomics = new ApiService();

class ApiService {
  constructor() {
    this.baseUrl = '/data'; // Para JSONs locales
  }

  async obtenerDatos(endpoint) {
    const response = await fetch(`${this.baseUrl}/${endpoint}.json`);
    if (!response.ok) {
      throw new Error(`Error al cargar ${endpoint}`);
    }
    return response.json();
  }
}

export const apiServiceEconomics = new ApiService();
// tourist-site.model.ts

// Define la interfaz TouristSite
export interface TouristSite {
  id?: number; // ID opcional del sitio turístico
  title: string; // Título del sitio turístico
  content: string; // Descripción del sitio turístico
  tourismType: string; // Tipo de turismo (ej. cultural, gastronómico, etc.)
  latitude: number; // Latitud de la ubicación del sitio turístico
  longitude: number; // Longitud de la ubicación del sitio turístico
}

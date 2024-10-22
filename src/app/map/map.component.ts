import { Component } from '@angular/core';
import { ElementRef, OnInit, ViewChild } from '@angular/core';
import {GoogleMapsModule} from "@angular/google-maps";

@Component({
  selector: 'app-map', // Selector del componente
  standalone: true, // Marca el componente como independiente
  imports: [GoogleMapsModule], // Importa el módulo de Google Maps
  templateUrl: './map.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./map.component.css'] // Rutas de los estilos CSS
})
export class MapComponent implements OnInit { // Implementa la interfaz OnInit

  @ViewChild('searchBox', { static: false }) searchBoxRef!: ElementRef; // Referencia al input del buscador
  map!: google.maps.Map; // Instancia del mapa
  service!: google.maps.places.PlacesService; // Servicio para buscar lugares
  markers: google.maps.Marker[] = []; // Arreglo para almacenar los marcadores en el mapa

  // Configuración inicial del mapa
  center: google.maps.LatLngLiteral = { lat: 4.297048327810719, lng: -74.80714539200189 }; // Coordenadas del centro del mapa
  zoom = 14; // Nivel de zoom inicial
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap', // Tipo de mapa
    maxZoom: 30, // Zoom máximo
    minZoom: 1 // Zoom mínimo
  };

  constructor() { }

  // Carga el script de Google Maps de forma asíncrona
  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Verifica si el script ya está cargado
      if (document.querySelector('script[src *= "maps.googleapis.com"]')) {
        resolve(); // Resuelve la promesa si ya está cargado
        return;
      }

      // Crea un nuevo elemento de script
      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQDXCwHtKNh_CG0RCREBaMAsYwCe8rvPU&libraries=places'; // URL del API de Google Maps
      script.async = true; // Carga asíncrona
      script.defer = true; // Retrasa la ejecución
      script.onload = () => resolve(); // Resuelve cuando el script se ha cargado
      script.onerror = () => reject(); // Rechaza la promesa si hay un error
      document.head.appendChild(script); // Añade el script al <head>
    });
  }

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit() {
    this.loadGoogleMapsScript().then(() => {
      this.initializeMap(); // Inicializa el mapa después de cargar el script
    }).catch(error => {
      console.error('Error al cargar la API de Google Maps', error); // Muestra un error si la carga falla
    });
  }

  // Inicializa el mapa
  initializeMap() {
    const mapElement = document.getElementById('map'); // Busca el elemento del mapa por ID
    if (!mapElement) {
      console.error('No se pudo encontrar el elemento del mapa.'); // Muestra un error si no se encuentra el elemento
      return;
    }

    // Crea una nueva instancia del mapa
    this.map = new google.maps.Map(mapElement, {
      center: this.center, // Establece el centro del mapa
      zoom: this.zoom, // Establece el nivel de zoom
      ...this.options // Combina con otras opciones
    });

    this.service = new google.maps.places.PlacesService(this.map); // Inicializa el servicio de lugares
    this.addSearchBox(); // Agrega el cuadro de búsqueda al mapa
  }

  // Agrega un cuadro de búsqueda al mapa
  addSearchBox() {
    const input = this.searchBoxRef.nativeElement as HTMLInputElement; // Obtiene el elemento de entrada del cuadro de búsqueda
    const searchBox = new google.maps.places.SearchBox(input); // Crea un nuevo SearchBox

    // Ajusta los límites del SearchBox según la vista actual del mapa
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds() as google.maps.LatLngBounds);
    });

    // Escucha el evento cuando el usuario selecciona un lugar del cuadro de búsqueda
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces(); // Obtiene los lugares seleccionados

      if (places?.length === 0) {
        return; // Si no hay lugares, no hace nada
      }

      this.clearMarkers(); // Limpia los marcadores anteriores

      const bounds = new google.maps.LatLngBounds(); // Crea un nuevo objeto de límites
      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry"); // Si no hay geometría, muestra un mensaje
          return;
        }

        // Crea un nuevo marcador en la ubicación del lugar
        const marker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location,
        });

        this.markers.push(marker); // Agrega el marcador al arreglo

        // Ajusta los límites del mapa según el lugar seleccionado
        if (place.geometry.viewport) {
          // Solo los lugares que tienen un viewport
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location); // Extiende los límites para incluir la ubicación
        }
      });

      this.map.fitBounds(bounds); // Ajusta el mapa para mostrar todos los límites
    });
  }

  // Filtra los lugares según el tipo especificado
  filterPlaces(type: string) {
    const request = {
      bounds: this.map.getBounds(), // Obtiene los límites actuales del mapa
      keyword: type // Utiliza la palabra clave para refinar la búsqueda
    };

    this.service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        this.clearMarkers(); // Limpia los marcadores anteriores

        results.forEach(place => {
          if (!place.geometry || !place.geometry.location) return; // Si no hay geometría, continúa

          // Personaliza el ícono para lugares turísticos
          const icon = type === 'tourist_attraction' ? {
            url: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png", // Ícono de árbol
            scaledSize: new google.maps.Size(40, 40) // Ajusta el tamaño del ícono
          } : undefined;

          // Crea un nuevo marcador para el lugar
          const marker = new google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
            title: place.name // Título del marcador
          });

          this.markers.push(marker); // Agrega el marcador al arreglo
        });
      }
    });
  }

  // Filtra lugares culturales
  filterCulturalPlaces() {
    const culturalKeywords = ['museum', 'art_gallery', 'historical', 'cultural heritage']; // Palabras clave para lugares culturales

    culturalKeywords.forEach(keyword => {
      const request = {
        bounds: this.map.getBounds(), // Obtiene los límites actuales del mapa
        keyword: keyword // Usa la palabra clave para la búsqueda
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          this.clearMarkers(); // Limpia los marcadores anteriores

          results.forEach(place => {
            if (!place.geometry || !place.geometry.location) return; // Si no hay geometría, continúa

            // Crea un nuevo marcador para el lugar cultural
            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              title: place.name // Título del marcador
            });

            this.markers.push(marker); // Agrega el marcador al arreglo
          });
        }
      });
    });
  }

  // Filtra lugares gastronómicos
  filterGastronomicPlaces() {
    const keywords = ['restaurant', 'food', 'dining', 'cafe', 'bistro']; // Palabras clave para lugares gastronómicos

    keywords.forEach(keyword => {
      const request = {
        bounds: this.map.getBounds(), // Obtiene los límites actuales del mapa
        keyword: keyword // Usa la palabra clave para la búsqueda
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          this.clearMarkers(); // Limpia los marcadores anteriores

          results.forEach(place => {
            if (!place.geometry || !place.geometry.location) return; // Si no hay geometría, continúa

            // Crea un nuevo marcador para el lugar gastronómico
            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              title: place.name // Título del marcador
            });

            this.markers.push(marker); // Agrega el marcador al arreglo
          });
        }
      });
    });
  }

  // Filtra lugares religiosos
  filterReligiousPlaces() {
    const religiousTypes = ['church', 'mosque', 'synagogue', 'temple']; // Tipos de lugares religiosos

    religiousTypes.forEach(type => {
      const request = {
        bounds: this.map.getBounds(), // Obtiene los límites actuales del mapa
        type: type // Usa el tipo para la búsqueda
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          this.clearMarkers(); // Limpia los marcadores anteriores

          results.forEach(place => {
            if (!place.geometry || !place.geometry.location) return; // Si no hay geometría, continúa

            // Crea un nuevo marcador para el lugar religioso
            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              title: place.name // Título del marcador
            });

            this.markers.push(marker); // Agrega el marcador al arreglo
          });
        }
      });
    });
  }

  // Limpia todos los marcadores del mapa
  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null); // Quita el marcador del mapa
    });
    this.markers = []; // Limpia el arreglo de marcadores
  }
}

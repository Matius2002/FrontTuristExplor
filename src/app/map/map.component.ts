import { Component } from '@angular/core';
import { ElementRef, OnInit, ViewChild } from '@angular/core';
import {GoogleMapsModule} from "@angular/google-maps";



@Component({
  selector: 'app-map',
  standalone: true,
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @ViewChild('searchBox', {static: false}) searchBoxRef!: ElementRef;
  map!: google.maps.Map;
  service!: google.maps.places.PlacesService;
  markers: google.maps.Marker[] = [];


  center: google.maps.LatLngLiteral = {lat: 4.297048327810719, lng: -74.80714539200189};
  zoom = 14;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap', /**/
    maxZoom: 30,
    minZoom: 1
  };

  constructor() {
  }

  loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector('script[src *= "maps.googleapis.com"]')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAQDXCwHtKNh_CG0RCREBaMAsYwCe8rvPU&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  }

  ngOnInit() {
    this.loadGoogleMapsScript().then(() => {
      this.initializeMap();
    }).catch(error => {
      console.error('Error al cargar la API de Google Maps', error);
    });
  }

  initializeMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      console.error('No se pudo encontrar el elemento del mapa.');
      return;
    }

    this.map = new google.maps.Map(mapElement, {
      center: this.center,
      zoom: this.zoom,
      ...this.options
    });

    this.service = new google.maps.places.PlacesService(this.map);
    this.addSearchBox();
  }

  addSearchBox() {
    const input = this.searchBoxRef.nativeElement as HTMLInputElement;
    const searchBox = new google.maps.places.SearchBox(input);

    //Sesgar los resultados del SearchBox hacia la vista actual del mapa.
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds() as google.maps.LatLngBounds);
    });

    /*Escucha el evento que se dispara cuando el usuario selecciona una predicción y obtiene
      más detalles sobre ese lugar.*/
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();

      if (places?.length === 0) {
        return;
      }

      this.clearMarkers();

      const bounds = new google.maps.LatLngBounds();
      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const marker = new google.maps.Marker({
          map: this.map,
          position: place.geometry.location,
        });

        this.markers.push(marker);

        if (place.geometry.viewport) {
          //Solo los geocódigos tienen viewport./
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      this.map.fitBounds(bounds);
    });
  }



  filterPlaces(type: string) {
    const request = {
      bounds: this.map.getBounds(),
      keyword: type // Usa keyword en lugar de type para refinar la búsqueda
    };

    this.service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        this.clearMarkers();

        results.forEach(place => {
          if (!place.geometry || !place.geometry.location) return;

          // Personalizar el ícono para lugares turísticos
          const icon = type === 'tourist_attraction' ? {
            url: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/park-71.png", // Ícono de árbol
            scaledSize: new google.maps.Size(40, 40) // Ajusta el tamaño del ícono
          } : undefined;

          const marker = new google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
            title: place.name
          });

          this.markers.push(marker);
        });
      }
    });
  }



  filterCulturalPlaces() {
    const culturalKeywords = ['museum', 'art_gallery', 'historical', 'cultural heritage']; // Palabras clave para buscar lugares culturales

    culturalKeywords.forEach(keyword => {
      const request = {
        bounds: this.map.getBounds(),
        keyword: keyword
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          this.clearMarkers();

          results.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              title: place.name
            });

            this.markers.push(marker);
          });
        }
      });
    });
  }



  filterGastronomicPlaces() {
    const keywords = ['restaurant', 'food', 'dining', 'cafe', 'bistro'];

    keywords.forEach(keyword => {
      const request = {
        bounds: this.map.getBounds(),
        keyword: keyword
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          this.clearMarkers();

          results.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              title: place.name
            });

            this.markers.push(marker);
          });
        }
      });
    });
  }

  filterReligiousPlaces() {
    const religiousTypes = ['church', 'mosque', 'synagogue', 'hindu_temple', 'place_of_worship']; // Tipos de lugares religiosos

    religiousTypes.forEach(type => {
      const request = {
        bounds: this.map.getBounds(),
        type: type
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          this.clearMarkers();

          results.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              title: place.name
            });

            this.markers.push(marker);
          });
        }
      });
    });
  }



  filterAventurePlaces() {
    const adventureKeywords = ['adventure park', 'hiking', 'extreme sports', 'climbing', 'rafting', 'zip line']; // Palabras clave relacionadas con la aventura

    adventureKeywords.forEach(keyword => {
      const request = {
        bounds: this.map.getBounds(),
        keyword: keyword
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          this.clearMarkers();

          results.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              title: place.name
            });

            this.markers.push(marker);
          });
        }
      });
    });
  }

  filterSustainablePlaces() {
    const sustainableKeywords = ['eco-friendly', 'nature reserve', 'ecotourism', 'organic farm', 'sustainable tourism'];

    sustainableKeywords.forEach(keyword => {
      const request = {
        bounds: this.map.getBounds(),
        keyword: keyword
      };

      this.service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          this.clearMarkers();

          results.forEach(place => {
            if (!place.geometry || !place.geometry.location) return;

            const marker = new google.maps.Marker({
              map: this.map,
              position: place.geometry.location,
              title: place.name
            });

            this.markers.push(marker);
          });
        }
      });
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }
}

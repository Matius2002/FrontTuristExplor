import {Component, OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {EventoService} from "../evento.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormGroup, FormsModule} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FilterPipe} from "../../../FilterPipe";

// Definición de la interfaz TipoTurismo
interface TipoTurismo {
  id: number; // Identificador único del tipo de turismo
  nombre: string; // Nombre del tipo de turismo
  descripcion: string; // Descripción del tipo de turismo
  popularidad: string; // Nivel de popularidad del tipo de turismo
}

// Definición de la interfaz Destinos
interface Destinos {
  id: number; // Identificador único del destino
  destinoName: string; // Nombre del destino
}

// Definición de la interfaz Images
interface Images {
  id: number; // Identificador único de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta de la imagen
  activa: boolean; // Estado de la imagen (activa o inactiva)
}

// Definición de la interfaz Evento
interface Evento {
  id: number; // Identificador único del evento
  destinos: Destinos[]; // Lista de destinos asociados al evento
  nombre: string; // Nombre del evento
  descripcion: string; // Descripción del evento
  fechaInicio: Date; // Fecha de inicio del evento
  fechaFin: Date; // Fecha de fin del evento
  ubicacion: string; // Ubicación del evento
  costoEntrada: number; // Costo de entrada al evento
  images: Images[]; // Lista de imágenes asociadas al evento
  tipoTurismo: TipoTurismo; // Tipo de turismo del evento
}

@Component({
  providers: [EventoService, HttpClient], // Servicios utilizados en el componente
  selector: 'app-evento-contenido', // Selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    NgIf, // Importación de NgIf para condiciones en la plantilla
    NgForOf, // Importación de NgFor para iteraciones en la plantilla
    HttpClientModule, // Importación del módulo HTTP
    NgOptimizedImage, // Importación para optimización de imágenes
    DatePipe, // Pipe para formatear fechas
    CurrencyPipe, // Pipe para formatear monedas
    FilterPipe, // Pipe personalizado para filtrado
    FormsModule, // Módulo para formularios
    NgClass, // Importación de NgClass para aplicar clases dinámicamente
  ],
  templateUrl: './evento-contenido.component.html', // URL de la plantilla HTML del componente
  styleUrls: ['./evento-contenido.component.css'] // URL de los estilos CSS del componente
})
export class EventoContenidoComponent implements OnInit { // Clase del componente
  crearForm!: FormGroup; // Formulario para crear un evento
  eventos: Evento[] = []; // Arreglo de eventos
  destinos: Destinos[] = []; // Arreglo de destinos
  imagen: Images[] = []; // Arreglo de imágenes

  isModalOpen: boolean = false; // Estado del modal (abierto o cerrado)
  selectedImage: any = null; // Imagen seleccionada para mostrar en el modal

  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc'; // Orden de clasificación (ascendente o descendente)
  searchText: string = ''; // Variable para el texto de búsqueda

  eventosFiltrados: Evento[] = []; // Eventos después de aplicar filtros
  tipoTurismoFiltrado: string = ''; // Filtro para tipo de turismo

  // Metodo para obtener la URL de la imagen
  getImageUrl(imagePath: string): string {
    const url = `http://localhost:8080/api${imagePath}`; // Construcción de la URL de la imagen
    // console.log(`Imagen con URL: ${url}`); // Descomentar para depurar
    return url; // Retorna la URL
  }

  constructor(
    private eventoService: EventoService, // Servicio para eventos
    private dialog: MatDialog, // Servicio para diálogos
    private router: Router, // Servicio para navegación
  ) {
    this.eventosFiltrados = this.eventos; // Inicializa los eventos filtrados
  }

  ngOnInit(): void {
    this.cargarEvento(); // Carga los eventos al iniciar
  }

  // Metodo para abrir el modal
  openModal(imagen: any) {
    console.log('Selected Image:', imagen); // Muestra la imagen seleccionada en consola
    this.selectedImage = imagen; // Establece la imagen seleccionada
    this.isModalOpen = true; // Abre el modal
  }

  // Metodo para cerrar el modal
  closeModal() {
    this.isModalOpen = false; // Cierra el modal
    this.selectedImage = null; // Resetea la imagen seleccionada
  }

  // Metodo para cargar eventos desde el servicio
  cargarEvento() {
    this.eventoService.recuperarTodosEvento().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data); // Muestra los datos recibidos en consola
        console.log("Cantidad de registros recibidos:", data.length); // Muestra la cantidad de registros
        this.eventos = data.map(evento => ({
          id: evento.id, // Asigna el id del evento
          nombre: evento.nombre, // Asigna el nombre del evento
          descripcion: evento.descripcion, // Asigna la descripción del evento
          destinos: evento.destinos, // Asigna los destinos del evento
          fechaInicio: new Date(evento.fechaInicio), // Convierte la fecha de inicio a objeto Date
          fechaFin: new Date(evento.fechaFin), // Convierte la fecha de fin a objeto Date
          ubicacion: evento.ubicacion, // Asigna la ubicación del evento
          costoEntrada: evento.costoEntrada, // Asigna el costo de entrada
          images: evento.images, // Asigna las imágenes del evento
          tipoTurismo: evento.tipoTurismo || { nombre: 'Desconocido' } // Valor por defecto si no hay tipo de turismo
        }));

        this.aplicarFiltros(); // Aplica filtros a los eventos
        this.totalPages = Math.ceil(this.eventos.length / this.itemsPerPage); // Calcula el total de páginas
        console.log("Datos de los eventos cargados correctamente:", this.eventos); // Muestra los eventos cargados en consola
      },
      error => {
        console.error('Error al cargar los eventos:', error); // Maneja errores al cargar eventos
      }
    );
  }

  // Metodo para aplicar filtros a los eventos
  aplicarFiltros(): void {
    this.eventosFiltrados = this.eventos.filter(evento =>
      (this.tipoTurismoFiltrado === '' || (evento.tipoTurismo && evento.tipoTurismo.nombre === this.tipoTurismoFiltrado)) &&
      (this.searchText === '' ||
        evento.destinos.some(destino => destino.destinoName.toLowerCase().includes(this.searchText.toLowerCase())) ||
        evento.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        evento.descripcion.toLowerCase().includes(this.searchText.toLowerCase()) ||
        evento.ubicacion.toLowerCase().includes(this.searchText.toLowerCase())
      )
    ); // Filtra eventos según tipo de turismo y texto de búsqueda
  }

  // Metodo para filtrar eventos por tipo de turismo
  filtrarPorTipoTurismo(tipoTurismo: string) {
    this.tipoTurismoFiltrado = tipoTurismo; // Establece el tipo de turismo filtrado
    this.aplicarFiltros(); // Aplica filtros
    this.scrollToEventos(); // Desplaza a la lista de eventos
  }

  // Metodo para desplazar la vista a la lista de eventos
  scrollToEventos() {
    const eventosLista = document.getElementById('eventos-lista'); // Obtiene el elemento de la lista de eventos
    if (eventosLista) {
      eventosLista.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente a la lista de eventos
    }
  }

  // Metodo para manejar errores al cargar imágenes
  onImageError(event: ErrorEvent, ruta: string) {
    console.error(`Error al cargar la imagen con ruta: ${ruta}`, event); // Muestra error en consola
  }

  // Metodo para ver todos los eventos
  verTodosLosEventos(): void {
    this.eventosFiltrados = this.eventos; // Muestra todos los eventos
    const eventosListaElement = document.getElementById('eventos-lista'); // Obtiene el elemento de la lista de eventos
    if (eventosListaElement) {
      eventosListaElement.scrollIntoView({ behavior: 'smooth' }); // Desplaza suavemente a la lista de eventos
    }
  }
}

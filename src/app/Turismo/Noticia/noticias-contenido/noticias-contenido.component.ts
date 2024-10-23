import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NoticiaService} from "../noticia.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {FormGroup, FormsModule} from "@angular/forms";
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FilterPipe} from "../../../FilterPipe";

// Define la interfaz TipoTurismo con sus propiedades
interface TipoTurismo {
  id: number; // Identificador del tipo de turismo
  nombre: string; // Nombre del tipo de turismo
}

// Define la interfaz Images con sus propiedades
interface Images {
  id: number; // Identificador de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta de la imagen
  activa: boolean; // Estado de activación de la imagen
}

// Define la interfaz Noticia que representa una noticia con sus propiedades
interface Noticia {
  id: number; // Identificador de la noticia
  titulo: string; // Título de la noticia
  contenido: string; // Contenido de la noticia
  fechaPublicacion: Date; // Fecha de publicación de la noticia
  fuente: string; // Fuente de la noticia
  images: Images[]; // Arreglo de imágenes asociadas a la noticia
  tipoTurismo: TipoTurismo; // Tipo de turismo asociado a la noticia
}

// Decorador de componente
@Component({
  providers:[NoticiaService, HttpClient], // Servicios proporcionados
  selector: 'app-noticias-contenido', // Selector del componente
  standalone: true, // Indica que es un componente independiente
  imports: [
    NgIf, // Importa NgIf para condicionales
    NgForOf, // Importa NgFor para iteraciones
    HttpClientModule, // Importa HttpClient para realizar solicitudes HTTP
    NgOptimizedImage, // Importa optimización de imágenes
    DatePipe, // Importa pipe para formatear fechas
    CurrencyPipe, // Importa pipe para formatear monedas
    FilterPipe, // Importa pipe personalizado para filtrado
    FormsModule, // Importa módulos de formularios
    NgClass, // Importa NgClass para clases dinámicas
  ],
  templateUrl: './noticias-contenido.component.html', // URL de la plantilla del componente
  styleUrls: ['./noticias-contenido.component.css'] // URL de los estilos del componente
})
export class NoticiasContenidoComponent implements OnInit {
  crearForm!: FormGroup; // Formulario reactivo
  noticias: Noticia[] = []; // Arreglo de noticias
  tipoTurismos: TipoTurismo [] = []; // Arreglo de tipos de turismo
  imagenes: Images [] = []; // Arreglo de imágenes
  isModalOpen: boolean = false; // Estado del modal (abierto/cerrado)
  selectedImage: any = null; // Imagen seleccionada para mostrar en el modal

  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc'; // Orden de clasificación (ascendente/descendente)
  searchText: string = ''; // Texto de búsqueda

  // Metodo para obtener la URL de la imagen
  getImageUrl(imagePath: string): string {
    const url = `http://localhost:8080/api${imagePath}`; // Construye la URL
    //console.log(`Imagen con URL: ${url}`); // Comentado: muestra la URL en consola
    return url; // Retorna la URL
  }

  // Constructor del componente
  constructor(
    private noticiaService: NoticiaService, // Servicio de noticias
    private router: Router, // Router para navegación
  ) {}

  // Metodo para abrir el modal
  openModal(imagen: any) {
    console.log('Selected Image:', imagen); // Muestra la imagen seleccionada en consola
    this.selectedImage = imagen; // Asigna la imagen seleccionada
    this.isModalOpen = true; // Abre el modal
  }

  // Metodo para cerrar el modal
  closeModal() {
    this.isModalOpen = false; // Cierra el modal
    this.selectedImage = null; // Resetea la imagen seleccionada
  }

  // Ciclo de vida del componente: se ejecuta al inicializar
  ngOnInit(): void {
    this.cargarNoticiasContenido(); // Carga las noticias al inicializar
  }

  // Metodo para cargar las noticias desde el servicio
  cargarNoticiasContenido() {
    // Lógica para cargar los datos de la base de datos
    this.noticiaService.recuperarTodosNoticia().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data); // Muestra datos en consola
        console.log("Cantidad de registros recibidos:", data.length); // Muestra cantidad de registros
        this.noticias = data.map(noticia => {
          return {
            id: noticia.id, // Asigna el id de la noticia
            titulo: noticia.titulo, // Asigna el título de la noticia
            contenido: noticia.contenido, // Asigna el contenido de la noticia
            fechaPublicacion: noticia.fechaPublicacion, // Asigna la fecha de publicación
            fuente: noticia.fuente, // Asigna la fuente de la noticia
            images: noticia.images, // Asigna las imágenes asociadas
            tipoTurismo: noticia.tipoTurismo, // Asigna el tipo de turismo
          };
        });
        this.totalPages = Math.ceil(this.noticias.length / this.itemsPerPage); // Calcula el total de páginas

        console.log("Datos de la Noticia cargados correctamente:", this.noticias); // Muestra noticias cargadas en consola
      },
      error => {
        console.error('Error al cargar las Noticias:', error); // Muestra error en consola si falla la carga
      }
    );
  }

  // Metodo para obtener las noticias filtradas según el texto de búsqueda
  getFilteredNoticias(): Noticia[] {
    if (!this.searchText) {
      return this.noticias; // Si no hay texto de búsqueda, muestra todas las noticias
    }
    const searchTextLower = this.searchText.toLowerCase(); // Convierte a minúsculas para la búsqueda
    return this.noticias.filter(noticia =>
      noticia.titulo.toLowerCase().includes(searchTextLower) || // Filtra por título
      noticia.tipoTurismo.nombre.toLowerCase().includes(searchTextLower) // Filtra por tipo de turismo
    );
  }

  // Metodo para manejar errores al cargar imágenes
  onImageError(event: ErrorEvent, ruta: string) {
    console.error(`Error al cargar la imagen con ruta: ${ruta}`, event); // Muestra el error en consola
  }
}

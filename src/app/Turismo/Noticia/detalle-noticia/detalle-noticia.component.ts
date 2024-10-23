import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NoticiaService} from "../noticia.service";
import {FormGroup, FormsModule} from "@angular/forms";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

// Interfaz para representar el tipo de turismo
interface TipoTurismo {
  id: number; // Identificador del tipo de turismo
  nombre: string; // Nombre del tipo de turismo
}

// Interfaz para representar una imagen
interface Images {
  id: number; // Identificador de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta de la imagen
  activa: boolean; // Estado de la imagen (activa/inactiva)
}

// Interfaz para representar una noticia
interface Noticia {
  id: number; // Identificador de la noticia
  titulo: string; // Título de la noticia
  contenido: string; // Contenido de la noticia
  fechaPublicacion: Date; // Fecha de publicación de la noticia
  fuente: string; // Fuente de la noticia
  images: Images[]; // Lista de imágenes asociadas a la noticia
  tipoTurismo: TipoTurismo; // Tipo de turismo relacionado con la noticia
}

@Component({
  providers: [NoticiaService], // Proveedor del servicio de noticias
  selector: 'app-detalle-noticia', // Selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    DatePipe, // Pipe para formatear fechas
    FormsModule, // Módulo de formularios
    NgIf, // Directiva para condiciones
    NgClass, // Directiva para clases
    NgForOf, // Directiva para bucles
    HttpClientModule // Módulo para realizar peticiones HTTP
  ],
  templateUrl: './detalle-noticia.component.html', // URL de la plantilla HTML
  styleUrls: ['./detalle-noticia.component.css'] // URL de los estilos CSS
})
export class DetalleNoticiaComponent implements OnInit {
  crearForm!: FormGroup; // FormGroup para manejar formularios (no se utiliza en el código proporcionado)
  noticias: Noticia[] = []; // Array de noticias
  tipoTurismos: TipoTurismo[] = []; // Array de tipos de turismo
  imagenes: Images[] = []; // Array de imágenes
  isModalOpen: boolean = false; // Estado del modal
  selectedImage: any = null; // Imagen seleccionada para mostrar en el modal

  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc'; // Orden de clasificación
  searchText: string = ''; // Texto de búsqueda

  noticiaId: number = 0; // Identificador de la noticia seleccionada
  selectedNoticia: Noticia | null = null; // Noticia seleccionada

  // Metodo para construir la URL de la imagen
  getImageUrl(imagePath: string): string {
    const url = `http://localhost:8080/api${imagePath}`; // Construye la URL de la imagen
    // console.log(`Imagen con URL: ${url}`); // Descomentar para depurar
    return url; // Retorna la URL
  }

  // Constructor del componente
  constructor(private noticiaService: NoticiaService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  // Metodo para abrir el modal
  openModal(imagen: any) {
    console.log('Selected Image:', imagen); // Muestra la imagen seleccionada en la consola
    this.selectedImage = imagen; // Asigna la imagen seleccionada
    this.isModalOpen = true; // Abre el modal
  }

  // Metodo para cerrar el modal
  closeModal() {
    this.isModalOpen = false; // Cierra el modal
    this.selectedImage = null; // Resetea la imagen seleccionada
  }

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.noticiaId = +params['id']; // Obtiene el ID de la noticia desde la ruta
      this.cargarNoticia(); // Carga la noticia correspondiente
    });
  }

  // Metodo para cargar una noticia por ID
  cargarNoticia() {
    if (this.noticiaId) { // Si hay un ID de noticia
      this.noticiaService.obtenerNoticia(this.noticiaId).subscribe(
        data => {
          console.log("Datos recibidos del servidor:", data); // Muestra los datos recibidos
          this.selectedNoticia = data; // Asigna la noticia seleccionada
        },
        error => {
          console.error('Error al cargar la Noticia:', error); // Maneja el error
        }
      );
    } else {
      this.cargarNoticiasContenido(); // Carga todas las noticias si no hay ID
    }
  }

  // Metodo para cargar todas las noticias
  cargarNoticiasContenido() {
    this.noticiaService.recuperarTodosNoticia().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data); // Muestra los datos recibidos
        this.noticias = data.map(noticia => {
          return {
            id: noticia.id,
            titulo: noticia.titulo,
            contenido: noticia.contenido,
            fechaPublicacion: noticia.fechaPublicacion,
            fuente: noticia.fuente,
            images: noticia.images,
            tipoTurismo: noticia.tipoTurismo,
          };
        });
        this.totalPages = Math.ceil(this.noticias.length / this.itemsPerPage); // Calcula el total de páginas
        console.log("Datos de las Noticias cargados correctamente:", this.noticias); // Muestra las noticias cargadas
      },
      error => {
        console.error('Error al cargar las Noticias:', error); // Maneja el error
      }
    );
  }

  // Metodo para filtrar noticias por texto de búsqueda
  getFilteredNoticias(): Noticia[] {
    if (!this.searchText) {
      return this.noticias; // Retorna todas las noticias si no hay texto de búsqueda
    }
    const searchTextLower = this.searchText.toLowerCase(); // Convierte el texto de búsqueda a minúsculas
    return this.noticias.filter(noticia =>
      noticia.titulo.toLowerCase().includes(searchTextLower) || // Filtra por título
      noticia.tipoTurismo.nombre.toLowerCase().includes(searchTextLower) // Filtra por tipo de turismo
    );
  }

  // Metodo que se ejecuta si hay un error al cargar la imagen
  onImageError(event: ErrorEvent, ruta: string) {
    console.error(`Error al cargar la imagen con ruta: ${ruta}`, event); // Muestra el error en la consola
  }

  // Metodo para navegar a todas las noticias
  verTodasLasNoticias() {
    this.router.navigate(['/noticia-contenido']); // Navega a la ruta de noticias
  }
}

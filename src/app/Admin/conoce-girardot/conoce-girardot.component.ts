import {Component,OnInit} from '@angular/core';
import {CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormGroup, FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {ImagesService} from "../../Turismo/Images/images.service";
import {HttpClientModule} from "@angular/common/http";
import {FilterPipe} from "../../FilterPipe";

// Definición de la interfaz para las imágenes que se manejarán en el componente
interface Images {
  id: number;        // ID único de la imagen
  nombre: string;    // Nombre de la imagen
  ruta: string;      // Ruta de la imagen en el servidor
  activa: boolean;   // Estado de la imagen (si está activa o no)
}

// Decorador de componente para definir las propiedades y dependencias del componente
@Component({
  providers: [ImagesService], // Proveedor para el servicio que manejará las imágenes
  selector: 'app-conoce-girardot', // Nombre del selector del componente
  templateUrl: './conoce-girardot.component.html', // Ruta del archivo HTML del componente
  standalone: true,            // El componente es autónomo y no tiene dependencias externas
  imports: [
    NgIf,                       // Directiva para mostrar/ocultar elementos en base a una condición
    NgForOf,                    // Directiva para recorrer arrays y mostrar contenido
    HttpClientModule,           // Módulo para realizar solicitudes HTTP
    NgOptimizedImage,           // Directiva para optimizar la carga de imágenes
    DatePipe,                   // Pipe para formatear fechas
    CurrencyPipe,               // Pipe para formatear valores monetarios
    FilterPipe,                 // Pipe personalizado para filtrar listas
    FormsModule,                // Módulo para manejo de formularios
    NgClass,                    // Directiva para manejar clases CSS dinámicamente
  ],
  styleUrls: ['./conoce-girardot.component.css'] // Estilos del componente
})
export class ConoceGirardotComponent implements OnInit {
  // Definición de las variables que serán utilizadas en el componente
  crearForm!: FormGroup;                // Formulario reactivo para el componente
  imagenes: Images[] = [];              // Array que almacenará las imágenes recuperadas
  isModalOpen: boolean = false;         // Variable para controlar si el modal está abierto o cerrado
  selectedImage: any = null;            // Imagen seleccionada para mostrar en el modal

  // Método para construir la URL de la imagen a partir de su ruta
  getImageUrl(imagePath: string): string {
    const url = `http://localhost:8080/api${imagePath}`; // Concatenación de la URL base con la ruta de la imagen
    //console.log(`Imagen con URL: ${url}`);  // Se puede descomentar para ver la URL en consola
    return url; // Retorna la URL de la imagen
  }

  // Constructor del componente, inyectando servicios necesarios
  constructor(
    private imagesService: ImagesService,  // Servicio para manejar operaciones de imágenes
    private router: Router,                // Router para redirigir a otras páginas
  ) { }

  // Método para abrir el modal con la imagen seleccionada
  openModal(imagen: any) {
    console.log('Selected Image:', imagen);  // Mostrar la imagen seleccionada en la consola
    this.selectedImage = imagen;             // Asignar la imagen seleccionada a la variable
    this.isModalOpen = true;                 // Abrir el modal
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;                // Cerrar el modal
    this.selectedImage = null;               // Limpiar la imagen seleccionada
  }

  // Método que se ejecuta cuando se inicializa el componente
  ngOnInit(): void {
    this.cargarImagenes();                   // Llamar al método que carga las imágenes al inicializar
  }

  // Método para cargar las imágenes desde el servicio
  cargarImagenes() {
    this.imagesService.recuperarTodosImages().subscribe(
      (data: Images[]) => {                  // Suscribirse al observable que retorna el servicio
        this.imagenes = data;                // Asignar los datos recibidos a la variable 'imagenes'
        this.filtrarImagenesParaCarrusel();  // Filtrar las imágenes que se utilizarán en el carrusel
      }
    );
  }

  // Método para filtrar las imágenes que se utilizarán en el carrusel
  filtrarImagenesParaCarrusel() {
    // Lista de rutas de las imágenes que se mostrarán en el carrusel
    const nombresRequeridos = [
      '/imagenes/TurismoCulturalCarusel1.jpg',
      '/imagenes/TurismoCulturalCarusel2.jpg',
      '/imagenes/TurismoCulturalCarusel3.jpg',
      '/imagenes/TurismoCulturalCarusel4.jpg',
      '/imagenes/TurismoCulturalCarusel5.jpg',
      '/imagenes/TurismoCulturalCarusel6.jpg'
    ];
    // Filtrar las imágenes, quedándose solo con las que están en la lista de 'nombresRequeridos'
    this.imagenes = this.imagenes.filter(imagen =>
      nombresRequeridos.includes(imagen.ruta) // Compara la ruta de la imagen con la lista de imágenes necesarias
    );
  }

  // Método para manejar los errores de carga de imágenes
  onImageError(event: ErrorEvent, ruta: string) {
    console.error(`Error al cargar la imagen con ruta: ${ruta}`, event); // Imprime el error en consola
  }
}


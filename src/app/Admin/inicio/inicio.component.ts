import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ExperienciaService} from "../../Turismo/Experiencia/experiencia.service";
import { HttpClientModule} from "@angular/common/http";
import {UsuarioService} from "../Usuarios/usuario.service";
import {NoticiaService} from "../../Turismo/Noticia/noticia.service";
import {interval, Subscription} from "rxjs";

// Interface para definir las propiedades de un Usuario
interface Usuario {
  id: number;
  nombreUsuario: string;
  email: string;
}

// Interface para definir las propiedades de un Destino
interface Destinos {
  id: number;
  destinoName: string;
}

// Interface para definir las propiedades de una Experiencia de usuario
interface Experiencia {
  id: number;
  calificacion: string;
  comentario: string;
  fecha: string;
  usuario: Usuario;    // Relación con la interface Usuario
  destino: Destinos;   // Relación con la interface Destinos
}

// Interface para definir las propiedades de un tipo de Turismo
interface TipoTurismo {
  id: number;
  nombre: string;
}

// Interface para definir las propiedades de una Imagen
interface Images {
  id: number;
  nombre: string;
  ruta: string;
  activa: boolean;
}

// Interface para definir las propiedades de una Noticia
interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: Date;
  fuente: string;
  images: Images[];      // Array de imágenes relacionadas con la noticia
  tipoTurismo: TipoTurismo; // Relación con la interface TipoTurismo
}

@Component({
  // Declaración de los servicios que se inyectarán en el componente
  providers: [ExperienciaService, UsuarioService, NoticiaService],
  selector: 'app-inicio',  // Selector del componente en el HTML
  standalone: true,        // Componente independiente
  imports: [
    NgIf,               // Directiva para mostrar/ocultar elementos
    HttpClientModule,   // Módulo para hacer peticiones HTTP
    NgForOf,            // Directiva para iterar sobre arrays
    NgClass,            // Directiva para agregar clases CSS dinámicamente
    DatePipe,           // Pipe para formatear fechas
  ],
  templateUrl: './inicio.component.html',  // Ruta al archivo HTML del componente
  styleUrl: './inicio.component.css'       // Ruta al archivo de estilos CSS del componente
})
export class InicioComponent implements OnInit {
  // Definición de las propiedades del componente
  experiencias: Experiencia[] = [];    // Lista de experiencias
  usuarios: Usuario[] = [];            // Lista de usuarios
  destinos: Destinos[] = [];           // Lista de destinos
  mostrarTodas: boolean = false;       // Controla si se deben mostrar todas las experiencias

  noticiasChunks: Noticia[][] = [];    // Contenedor para agrupar noticias en chunks de 3
  tipoTurismos: TipoTurismo[] = [];     // Lista de tipos de turismo
  imagenes: Images[] = [];             // Lista de imágenes

  isModalOpen: boolean = false;        // Controla la apertura del modal de imágenes
  selectedImage: any = null;           // Imagen seleccionada para mostrar en el modal
  private subscription: Subscription = new Subscription();  // Suscripción para manejo de intervalos

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private experienciaService: ExperienciaService,
    private noticiaService: NoticiaService,
    private router: Router
  ) {}

  // Método de navegación para redirigir a diferentes rutas del proyecto
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  // Método para abrir el modal de imagenes
  openModal(imagen: any) {
    console.log('Selected Image:', imagen);  // Log de la imagen seleccionada
    this.selectedImage = imagen;
    this.isModalOpen = true;   // Cambia el estado para abrir el modal
  }

  // Método para cerrar el modal de imagenes
  closeModal() {
    this.isModalOpen = false;   // Cambia el estado para cerrar el modal
    this.selectedImage = null;  // Limpia la imagen seleccionada
  }

  // Método que se ejecuta cuando se inicializa el componente
  ngOnInit(): void {
    this.cargarExperiencias();  // Carga las experiencias desde el servicio
    this.cargarNoticias();      // Carga las noticias desde el servicio
    // Cambia las noticias automáticamente cada 5 segundos
    this.subscription.add(interval(5000).subscribe(() => {
      this.rotateNews();
    }));
  }

  // Método que se ejecuta cuando el componente se destruye
  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Cancela la suscripción cuando el componente se destruye
  }

  // Método para cargar las experiencias desde el servicio
  cargarExperiencias() {
    this.experienciaService.recuperarTodosExperiencia().subscribe(
      (data: Experiencia[]) => {
        this.experiencias = data;  // Asigna las experiencias recibidas al array de experiencias
      },
      (error) => {
        console.error('Error al cargar las experiencias', error);  // Muestra error en consola si falla la petición
      }
    );
  }

  // Método para alternar entre mostrar todas las experiencias o solo las primeras 4
  toggleMostrarTodas() {
    this.mostrarTodas = !this.mostrarTodas;  // Cambia el estado de mostrar todas las experiencias
  }

  // Método para obtener la lista de experiencias visibles, dependiendo del estado de "mostrarTodas"
  getExperienciasVisibles(): Experiencia[] {
    return this.mostrarTodas ? this.experiencias : this.experiencias.slice(0, 4);
  }

  // Método para convertir la calificación textual en un número de estrellas
  getCalificacionEstrellas(calificacion: string): number {
    switch (calificacion) {
      case 'Excelente': return 5;
      case 'Bueno': return 4;
      case 'Regular': return 3;
      case 'Malo': return 2;
      case 'Muy_Malo': return 1;
      default: return 0;  // Si no hay calificación válida
    }
  }

  // Método para cargar las noticias desde el servicio
  cargarNoticias() {
    this.noticiaService.recuperarTodosNoticia().subscribe(
      (data: Noticia[]) => {
        console.log('Noticias cargadas:', data);
        // Agrupa las noticias en "chunks" de 3
        this.noticiasChunks = this.chunkArray(data, 3);
        console.log('Chunks de noticias:', this.noticiasChunks);
      },
      (error) => {
        console.error('Error al cargar las Noticias', error);  // Muestra error en consola si falla la petición
      }
    );
  }

  // Función para dividir un array en grupos de tamaño especificado
  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)  // Extrae porciones del array
    );
  }

  // Función para rotar las noticias visibles (sacar el primer grupo y ponerlo al final)
  rotateNews() {
    if (this.noticiasChunks.length > 1) {
      const firstGroup = this.noticiasChunks.shift(); // Sacar el primer grupo
      if (firstGroup) {
        this.noticiasChunks.push(firstGroup); // Poner el primer grupo al final
      }
    }
  }

  // Método para manejar errores al cargar imágenes
  onImageError(event: ErrorEvent, ruta: string | undefined) {
    console.error(`Error al cargar la imagen con ruta: ${ruta}`, event);
    // Se puede manejar el error, por ejemplo, mostrando una imagen alternativa
  }

  // Método para construir la URL completa de una imagen
  getImageUrl(imagePath: string | undefined): string {
    const url = `http://localhost:8080/api${imagePath}`;  // Construye la URL de la imagen
    return url;
  }

  // Método para redirigir al detalle de una noticia
  verDetalleNoticia(noticia: Noticia) {
    this.router.navigate(['/noticias', noticia.id], { state: { noticia } });
  }

  // Método para formatear la fecha a una cadena de texto local
  formatDate(dateString: Date): string {
    return new Date(dateString).toLocaleDateString();
  }
}

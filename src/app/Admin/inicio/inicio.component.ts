import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {ExperienciaService} from "../../Turismo/Experiencia/experiencia.service";
import { HttpClientModule} from "@angular/common/http";
import {UsuarioService} from "../Usuarios/usuario.service";
import {NoticiaService} from "../../Turismo/Noticia/noticia.service";
import {interval, Subscription} from "rxjs";

interface Usuario {
  id: number;
  nombreUsuario: string;
  email: string;

}
interface Destinos {
  id: number;
  destinoName: string;

}
interface Experiencia {
  id: number;
  calificacion: string;
  comentario: string;
  fecha: string;
  usuario: Usuario;
  destino: Destinos;
}

interface TipoTurismo {
  id: number;
  nombre: string;
}

interface Images {
  id: number;
  nombre: string;
  ruta: string;
  activa: boolean;
}

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: Date;
  fuente: string;
  images: Images[];
  tipoTurismo: TipoTurismo;
}
@Component({
  providers: [ExperienciaService, UsuarioService, NoticiaService],
  selector: 'app-inicio',
  standalone: true,
  imports: [
    NgIf,
    HttpClientModule,
    NgForOf,
    NgClass,
    DatePipe,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit{
  experiencias: Experiencia[] = [];
  usuarios: Usuario [] = [];
  destinos: Destinos [] = [];
  mostrarTodas: boolean = false;

  noticiasChunks: Noticia[][] = [];
  tipoTurismos: TipoTurismo[] = [];
  imagenes: Images[] = [];

  isModalOpen: boolean = false;
  selectedImage: any = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private experienciaService: ExperienciaService,
    private noticiaService: NoticiaService,
    private router: Router
  ) {}

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  openModal(imagen: any) {
    console.log('Selected Image:', imagen);
    this.selectedImage = imagen;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedImage = null;
  }

  ngOnInit(): void {
    this.cargarExperiencias();
    this.cargarNoticias();
    // Cambiar noticias automáticamente cada 5 segundos (5000 ms)
    this.subscription.add(interval(5000).subscribe(() => {
      this.rotateNews();
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarExperiencias() {
    this.experienciaService.recuperarTodosExperiencia().subscribe(
      (data: Experiencia[]) => {
        this.experiencias = data;
      },
      (error) => {
        console.error('Error al cargar las experiencias', error);
      }
    );
  }

  // Método para alternar entre mostrar todas o algunas experiencias
  toggleMostrarTodas() {
    this.mostrarTodas = !this.mostrarTodas;
  }

  // Método para obtener la lista de experiencias visibles
  getExperienciasVisibles(): Experiencia[] {
    return this.mostrarTodas ? this.experiencias : this.experiencias.slice(0, 4);
  }

  // Método para convertir la calificación textual en estrellas
  getCalificacionEstrellas(calificacion: string): number {
    switch (calificacion) {
      case 'Excelente':
        return 5;
      case 'Bueno':
        return 4;
      case 'Regular':
        return 3;
      case 'Malo':
        return 2;
      case 'Muy_Malo':
        return 1;
      default:
        return 0; // Si no hay calificación válida
    }
  }

  cargarNoticias() {
    this.noticiaService.recuperarTodosNoticia().subscribe(
      (data: Noticia[]) => {
        console.log('Noticias cargadas:', data);
        // Agrupar noticias en chunks de tamaño 3
        this.noticiasChunks = this.chunkArray(data, 3);
        console.log('Chunks de noticias:', this.noticiasChunks);
      },
      (error) => {
        console.error('Error al cargar las Noticias', error);
      }
    );
  }

  // Función para dividir un array en grupos de tamaño especificado
  chunkArray(array: any[], size: number): any[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    );
  }

  // Función para rotar las noticias visibles
  rotateNews() {
    if (this.noticiasChunks.length > 1) {
      const firstGroup = this.noticiasChunks.shift(); // Sacar el primer grupo
      if (firstGroup) {
        this.noticiasChunks.push(firstGroup); // Poner el primer grupo al final
      }
    }
  }

  onImageError(event: ErrorEvent, ruta: string | undefined) {
    console.error(`Error al cargar la imagen con ruta: ${ruta}`, event);
    // Puedes manejar el error aquí, por ejemplo, mostrando una imagen alternativa o un mensaje de error
  }

  getImageUrl(imagePath: string | undefined): string {
    const url = `http://localhost:8080/api${imagePath}`;
    //console.log(`Imagen con URL: ${url}`);
    return url;
  }

  verDetalleNoticia(noticia: Noticia) {
    this.router.navigate(['/noticias', noticia.id], { state: { noticia } });
  }

  formatDate(dateString: Date): string {
    return new Date(dateString).toLocaleDateString();
  }
}

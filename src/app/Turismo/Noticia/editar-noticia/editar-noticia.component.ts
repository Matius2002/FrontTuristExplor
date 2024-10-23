import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NoticiaService} from "../noticia.service";
import {NgForOf, NgIf} from "@angular/common";
import Swal from "sweetalert2";

// Definimos la interfaz TipoTurismo para representar los tipos de turismo
interface TipoTurismo {
  id: number; // Identificador del tipo de turismo
  nombre: string; // Nombre del tipo de turismo
}

// Definimos la interfaz Images para representar las imágenes
interface Images {
  id: number; // Identificador de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta donde se encuentra la imagen
  activa: boolean; // Estado de la imagen (activa/inactiva)
}

// Definimos la interfaz Noticia para representar una noticia
interface Noticia {
  id: number; // Identificador de la noticia
  titulo: string; // Título de la noticia
  contenido: string; // Contenido de la noticia
  fechaPublicacion: Date; // Fecha y hora de publicación de la noticia
  fuente: string; // Fuente de la noticia
  images: Images[]; // Arreglo de imágenes asociadas a la noticia
  tipoTurismo: TipoTurismo; // Tipo de turismo de la noticia
}

@Component({
  providers: [HttpClient, NoticiaService], // Servicios proporcionados en el componente
  selector: 'app-editar-noticia', // Selector del componente
  standalone: true, // Indica que este es un componente independiente
  imports: [ // Módulos importados por el componente
    ReactiveFormsModule, // Para trabajar con formularios reactivos
    NgIf, // Directiva para mostrar/ocultar elementos
    HttpClientModule, // Para realizar solicitudes HTTP
    MatDialogModule, // Módulo para usar diálogos de Angular Material
    NgForOf, // Directiva para iterar sobre colecciones
  ],
  templateUrl: './editar-noticia.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./editar-noticia.component.css'] // Rutas de los archivos de estilo CSS
})
export class EditarNoticiaComponent implements OnInit {
  editarForm!: FormGroup; // Formulario reactivo para editar noticia
  noticias!: Noticia; // Variable para almacenar la noticia a editar
  imagenes: Images[] = []; // Arreglo para almacenar las imágenes
  tipoTurismo: TipoTurismo[] = []; // Arreglo para almacenar los tipos de turismo

  // Constructor del componente
  constructor(
    public dialogRef: MatDialogRef<EditarNoticiaComponent>, // Referencia al diálogo
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados en el diálogo
    private noticiaService: NoticiaService, // Servicio para gestionar noticias
    private formBuilder: FormBuilder, // Constructor para formularios reactivos
  ) {
    this.noticias = data.noticias; // Asignamos la noticia recibida desde el diálogo
  }

  ngOnInit(): void {
    // Inicializamos el formulario con los valores de la noticia
    this.editarForm = this.formBuilder.group({
      titulo: [this.noticias.titulo, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]], // Control de título
      contenido: [this.noticias.contenido, [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]], // Control de contenido
      fuente: [this.noticias.fuente, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]], // Control de fuente
      fechaPublicacion: [this.formatDate(this.noticias.fechaPublicacion), Validators.required], // Control de fecha de publicación
      images: [this.noticias.images.map(i => i.id), Validators.required], // Control de imágenes seleccionadas
      tipoTurismo: [this.noticias.tipoTurismo.id, Validators.required], // Control de tipo de turismo
    });

    this.cargarDatosIniciales(); // Cargar datos iniciales para el componente
  }

  // Metodo para formatear la fecha en un formato adecuado
  private formatDate(date: Date): string {
    return new Date(date).toISOString().slice(0, 16); // Formato de fecha para el input
  }

  // Metodo para encontrar elementos seleccionados en un arreglo basado en sus IDs
  private findSelectedItems(array: any[], ids: number[]): any[] {
    return array.filter(item => ids.includes(item.id)); // Filtra elementos que coinciden con los IDs seleccionados
  }

  // Metodo para cargar datos iniciales desde el servicio
  private cargarDatosIniciales(): void {
    // Recuperamos todos los tipos de turismo
    this.noticiaService.recuperarTodosTipos().subscribe(
      (tipos: TipoTurismo[]) => {
        this.tipoTurismo = tipos; // Asignamos los tipos de turismo recibidos
      },
      error => {
        console.error('Error al recuperar tipos de turismo:', error); // Manejo de errores
      }
    );

    // Recuperamos todas las imágenes
    this.noticiaService.recuperarTodosImages().subscribe(
      (imagenes: Images[]) => {
        this.imagenes = imagenes; // Asignamos las imágenes recibidas
      },
      error => {
        console.error('Error al recuperar imágenes:', error); // Manejo de errores
      }
    );
  }

  // Metodo para manejar la sumisión del formulario
  onSubmit(): void {
    if (this.editarForm.valid) { // Verificamos si el formulario es válido
      const formData = this.editarForm.value; // Obtenemos los valores del formulario
      formData.images = this.findSelectedItems(this.imagenes, formData.images); // Encontramos las imágenes seleccionadas
      formData.tipoTurismo = this.tipoTurismo.find(t => t.id === formData.tipoTurismo); // Encontramos el tipo de turismo seleccionado

      // Actualizamos la noticia a través del servicio
      this.noticiaService.actualizarNoticia(this.noticias.id, formData).subscribe(
        () => {
          this.dialogRef.close('success'); // Cerramos el diálogo con éxito
          Swal.fire('¡Actualizado!', 'La noticia se ha actualizado correctamente.', 'success'); // Mensaje de éxito
        },
        error => {
          console.error('Error al actualizar noticia:', error); // Manejo de errores
          Swal.fire('¡Error!', 'Hubo un error al actualizar la noticia.', 'error'); // Mensaje de error
        }
      );
    } else {
      this.editarForm.markAllAsTouched(); // Marcamos todos los campos como tocados para mostrar errores
    }
  }

  // Metodo para cancelar la edición y cerrar el diálogo
  onCancelar(): void {
    this.dialogRef.close(); // Cerramos el diálogo sin cambios
  }

  // Metodo para limpiar el formulario
  onClearForm(): void {
    this.editarForm.reset(); // Reiniciamos el formulario a su estado inicial
  }
}

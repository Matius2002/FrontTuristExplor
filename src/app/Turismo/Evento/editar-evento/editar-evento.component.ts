import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EventoService} from "../evento.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

// Interfaz que define la estructura de un destino
interface Destinos {
  id: number; // Identificador único del destino
  destinoName: string; // Nombre del destino
}

// Interfaz que define la estructura de una imagen
interface Images {
  id: number; // Identificador único de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta de acceso a la imagen
  activa: boolean; // Indica si la imagen está activa
}

// Interfaz que define la estructura de un evento
interface Evento {
  id: number; // Identificador único del evento
  destinos: Destinos[]; // Lista de destinos asociados al evento
  nombre: string; // Nombre del evento
  descripcion: string; // Descripción del evento
  fechaInicio: Date; // Fecha de inicio del evento
  fechaFin: Date; // Fecha de finalización del evento
  ubicacion: string; // Ubicación del evento
  costoEntrada: number; // Costo de entrada al evento
  images: Images[]; // Lista de imágenes asociadas al evento
}

@Component({
  providers: [HttpClient, EventoService], // Proveedores necesarios para el componente
  selector: 'app-editar-evento', // Selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    ReactiveFormsModule, // Módulo para formularios reactivos
    NgIf, // Directiva para condicionales
    HttpClientModule, // Módulo para realizar solicitudes HTTP
    MatDialogModule, // Módulo para diálogos de Material
    NgForOf, // Directiva para iterar sobre listas
  ],
  templateUrl: './editar-evento.component.html', // URL de la plantilla HTML del componente
  styleUrls: ['./editar-evento.component.css'] // URL de los estilos CSS del componente
})
export class EditarEventoComponent implements OnInit {
  editarForm!: FormGroup; // Formulario reactivo para editar el evento
  eventos!: Evento; // Variable que contendrá los datos del evento a editar
  destinos: Destinos[] = []; // Lista de destinos disponibles
  imagenes: Images[] = []; // Lista de imágenes disponibles

  // Constructor del componente
  constructor(
    public dialogRef: MatDialogRef<EditarEventoComponent>, // Referencia al diálogo de Material
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados en el diálogo
    private eventoService: EventoService, // Servicio para manejar eventos
    private formBuilder: FormBuilder, // Constructor de formularios reactivos
    private router: Router, // Router para la navegación
  ) {
    this.eventos = this.data.eventos; // Asigna el evento recibido a la variable de evento
  }

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Inicializa el formulario reactivo con los valores del evento
    this.editarForm = this.formBuilder.group({
      nombre: [this.eventos.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: [this.eventos.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      ubicacion: [this.eventos.ubicacion, Validators.required],
      costoEntrada: [this.eventos.costoEntrada, Validators.required],
      fechaInicio: [this.formatDate(this.eventos.fechaInicio), Validators.required],
      fechaFin: [this.formatDate(this.eventos.fechaFin), Validators.required],
      destinos: [this.eventos.destinos.map(d => d.id), Validators.required],
      images: [this.eventos.images.map(i => i.id), Validators.required],
    });

    // Carga los datos iniciales para el componente
    this.cargarDatosIniciales();
  }

  // Metodo privado para formatear la fecha
  private formatDate(date: Date): string {
    return new Date(date).toISOString().slice(0, 16); // Devuelve la fecha en formato ISO
  }

  // Metodo privado para encontrar elementos seleccionados en una lista
  private findSelectedItems(array: any[], ids: number[]): any[] {
    return array.filter(item => ids.includes(item.id)); // Filtra los elementos que coinciden con los IDs
  }

  // Metodo privado para cargar datos iniciales
  private cargarDatosIniciales(): void {
    // Recupera destinos disponibles desde el servicio
    this.eventoService.recuperarDestinos().subscribe(
      (destinos: Destinos[]) => {
        this.destinos = destinos; // Asigna los destinos a la variable
      },
      error => {
        console.error('Error al recuperar destinos:', error); // Manejo de errores
      }
    );

    // Recupera imágenes disponibles desde el servicio
    this.eventoService.recuperarImages().subscribe(
      (imagenes: Images[]) => {
        this.imagenes = imagenes; // Asigna las imágenes a la variable
      },
      error => {
        console.error('Error al recuperar imágenes:', error); // Manejo de errores
      }
    );
  }

  // Metodo que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.editarForm.valid) { // Verifica si el formulario es válido
      const formData = this.editarForm.value; // Obtiene los datos del formulario
      formData.destinos = this.findSelectedItems(this.destinos, formData.destinos); // Busca los destinos seleccionados
      formData.images = this.findSelectedItems(this.imagenes, formData.images); // Busca las imágenes seleccionadas

      // Llama al servicio para actualizar el evento
      this.eventoService.actualizarEvento(this.eventos.id, formData).subscribe(
        () => {
          this.dialogRef.close('success'); // Cierra el diálogo con éxito
          Swal.fire('¡Actualizado!', 'El evento se ha actualizado correctamente.', 'success'); // Muestra un mensaje de éxito
        },
        error => {
          console.error('Error al actualizar evento:', error); // Manejo de errores
          Swal.fire('¡Error!', 'Hubo un error al actualizar el evento.', 'error'); // Muestra un mensaje de error
        }
      );
    } else {
      this.editarForm.markAllAsTouched(); // Marca todos los campos del formulario como tocados
    }
  }

  // Metodo que se ejecuta al cancelar la edición
  onCancelar(): void {
    this.dialogRef.close(); // Cierra el diálogo
  }

  // Metodo que se ejecuta para limpiar el formulario
  onClearForm(): void {
    this.editarForm.reset(); // Reinicia el formulario a su estado inicial
  }
}

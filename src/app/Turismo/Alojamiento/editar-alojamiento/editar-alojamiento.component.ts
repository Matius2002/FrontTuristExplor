import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AlojamientoService} from "../alojamiento.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";

// Interfaces que definen la estructura de datos para los diferentes modelos utilizados en el componente

interface Destinos {
  id: number;
  destinoName: string;
}

interface TipoAlojamiento {
  id: number;
  nombre: string;
}

interface Images {
  id: number;
  nombre: string;
  ruta: string;
  activa: boolean;
}

interface Alojamiento {
  id: number;
  descripcion: string;
  destinos: Destinos[];
  nombre: string;
  tipoAlojamiento: TipoAlojamiento;
  direccion: string;
  celular: string;
  email: string;
  webUrl: string;
  precioGeneral: number;
  fechaCreacion: Date;
  imagenes: Images[];
}

// Decorador de componente que define el selector, las dependencias y las plantillas del componente
@Component({
  providers: [HttpClient, AlojamientoService],
  selector: 'app-editar-alojamiento',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    HttpClientModule,
    MatDialogModule,
    NgForOf,
  ],
  templateUrl: './editar-alojamiento.component.html',
  styleUrls: ['./editar-alojamiento.component.css']
})
export class EditarAlojamientoComponent implements OnInit {
  // Propiedades del componente
  editarForm!: FormGroup;  // FormGroup para el formulario de edición
  alojamientos!: Alojamiento;  // Alojamiento actual que se está editando
  tipoAlojamientos: TipoAlojamiento[] = [];  // Lista de tipos de alojamiento
  destinos: Destinos[] = [];  // Lista de destinos
  imagenes: Images[] = [];  // Lista de imágenes

  constructor(
    public dialogRef: MatDialogRef<EditarAlojamientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alojamientoService: AlojamientoService,
    private formBuilder: FormBuilder,
  ) {
    this.alojamientos = data.alojamientos;  // Asignación del alojamiento recibido al componente
  }

  // Inicialización del componente
  ngOnInit(): void {
    // Inicialización del formulario con validaciones
    this.editarForm = this.formBuilder.group({
      descripcion: [this.alojamientos.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      destinos: [this.alojamientos.destinos.map(d => d.id), Validators.required],
      nombre: [this.alojamientos.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      tipoAlojamiento: [this.alojamientos.tipoAlojamiento.id, Validators.required],
      direccion: [this.alojamientos.direccion, Validators.required],
      celular: [this.alojamientos.celular, [Validators.required, Validators.pattern('^\\+?[1-9]\\d{1,14}$')]],
      email: [this.alojamientos.email, [Validators.required, Validators.email]],
      webUrl: [this.alojamientos.webUrl, Validators.required],
      precioGeneral: [this.alojamientos.precioGeneral, [Validators.required, Validators.min(0)]],
      fechaCreacion: [this.formatDate(this.alojamientos.fechaCreacion), Validators.required],
      imagenes: [this.alojamientos.imagenes.map(i => i.id), Validators.required]
    });

    this.cargarDatosIniciales();  // Carga de datos iniciales para el componente
  }

  // Formatea la fecha en un formato específico
  private formatDate(date: Date): string {
    return new Date(date).toISOString().slice(0, 16);
  }

  // Busca elementos seleccionados en un array dado sus IDs
  private findSelectedItems(array: any[], ids: number[]): any[] {
    return array.filter(item => ids.includes(item.id));
  }

  // Carga de datos iniciales para destinos, tipos de alojamiento e imágenes
  private cargarDatosIniciales(): void {
    this.alojamientoService.recuperarTodosDestinos().subscribe(
      (destinos: Destinos[]) => {
        this.destinos = destinos;  // Asignación de destinos recuperados
      },
      error => {
        console.error('Error al recuperar destinos:', error);
      }
    );

    this.alojamientoService.recuperarTodosTiposAlojamiento().subscribe(
      (tipos: TipoAlojamiento[]) => {
        this.tipoAlojamientos = tipos;  // Asignación de tipos de alojamiento recuperados
      },
      error => {
        console.error('Error al recuperar tipos de alojamiento:', error);
      }
    );

    this.alojamientoService.recuperarTodosImages().subscribe(
      (imagenes: Images[]) => {
        this.imagenes = imagenes;  // Asignación de imágenes recuperadas
      },
      error => {
        console.error('Error al recuperar imágenes:', error);
      }
    );
  }

  // Maneja el evento de envío del formulario
  onSubmit(): void {
    if (this.editarForm.valid) {
      const formData = this.editarForm.value;  // Obtiene los datos del formulario
      // Busca los destinos e imágenes seleccionados
      formData.destinos = this.findSelectedItems(this.destinos, formData.destinos);
      formData.imagenes = this.findSelectedItems(this.imagenes, formData.imagenes);

      // Llama al servicio para actualizar el alojamiento
      this.alojamientoService.actualizarAlojamiento(this.alojamientos.id, formData).subscribe(
        () => {
          this.dialogRef.close('success');  // Cierra el diálogo con éxito
          Swal.fire('¡Actualizado!', 'El alojamiento se ha actualizado correctamente.', 'success');  // Mensaje de éxito
        },
        error => {
          console.error('Error al actualizar alojamiento:', error);
          Swal.fire('¡Error!', 'Hubo un error al actualizar el alojamiento.', 'error');  // Mensaje de error
        }
      );
    } else {
      this.editarForm.markAllAsTouched();  // Marca todos los campos como tocados si el formulario no es válido
    }
  }

  // Maneja el evento de cancelar la edición
  onCancelar(): void {
    this.dialogRef.close();  // Cierra el diálogo sin realizar cambios
  }

  // Limpia el formulario
  onClearForm(): void {
    this.editarForm.reset();  // Resetea el formulario a su estado inicial
  }
}

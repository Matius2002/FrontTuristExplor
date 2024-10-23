import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {AtracionesService} from "../atraciones.service";
import Swal from "sweetalert2";

// Definición de la interfaz Atraciones
interface Atraciones {
  id: number; // ID de la atracción
  nombre: string; // Nombre de la atracción
  descripcion: string; // Descripción de la atracción
  horarioFuncionamiento: string; // Horario de inicio de funcionamiento
  horarioFin: string; // Horario de fin de funcionamiento
}

@Component({
  providers: [HttpClient, AtracionesService], // Proveedores necesarios para el componente
  selector: 'app-editar-atraciones', // Selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    ReactiveFormsModule, // Importación del módulo para formularios reactivos
    NgIf, // Importación del módulo para directivas condicionales
    HttpClientModule, // Importación del módulo HTTP
    MatDialogModule, // Importación del módulo de diálogos de Angular Material
  ],
  templateUrl: './editar-atraciones.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./editar-atraciones.component.css'] // Ruta a los estilos CSS
})
export class EditarAtracionesComponent implements OnInit {
  editarForm!: FormGroup; // Grupo de formulario para editar atracciones
  atraciones!: Atraciones; // Objeto de tipo Atraciones para almacenar la atracción a editar

  // Constructor del componente
  constructor(
    public dialogRef: MatDialogRef<EditarAtracionesComponent>, // Referencia al diálogo
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados en el diálogo
    private atracionesService: AtracionesService, // Servicio para gestionar atracciones
    private formBuilder: FormBuilder, // Constructor de formularios reactivos
  ) {
    this.atraciones = data.atraciones; // Asignación de la atracción a editar desde los datos
  }

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.editarForm = this.formBuilder.group({
      // Inicialización de los controles del formulario con validaciones
      nombre: [this.data.atraciones.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: [this.data.atraciones.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      horarioFuncionamiento: [this.data.atraciones.horarioFuncionamiento, [Validators.required]],
      horarioFin: [this.data.atraciones.horarioFin, [Validators.required]],
    });
  }

  // Metodo que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.editarForm.valid) { // Verificación de que el formulario es válido
      const atraccionActualizada = this.editarForm.value; // Obtención de los valores del formulario
      this.atracionesService.actualizarAtraciones(this.atraciones.id, atraccionActualizada).subscribe(
        () => {
          this.dialogRef.close('success'); // Cierre del diálogo con éxito
          Swal.fire('¡Actualizado!', 'La Atracción Turística se ha actualizado correctamente.', 'success'); // Notificación de éxito
        },
        error => {
          Swal.fire('¡Error!', 'Hubo un error al actualizar la Atracción Turística.', 'error'); // Notificación de error
          console.error(error); // Registro del error en la consola
        }
      );
    } else {
      this.editarForm.markAllAsTouched(); // Marca todos los campos como tocados si el formulario no es válido
    }
  }

  // Metodo para cancelar la edición
  onCancelar(): void {
    this.dialogRef.close(); // Cierre del diálogo sin realizar cambios
  }

  // Metodo para limpiar el formulario
  onClearForm(): void {
    this.editarForm.reset(); // Reinicio de los campos del formulario
  }
}

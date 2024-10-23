import {Component, Inject, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EpocaVisitarService} from "../epoca-visitar.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";

// Definición de la interfaz EpocaVisitar
interface EpocaVisitar {
  id: number; // Identificador único de la época
  nombre: string; // Nombre de la época
  descripcion: string; // Descripción de la época
  clima: string; // Clima de la época
}

@Component({
  providers: [HttpClient, EpocaVisitarService], // Proveedores del servicio y HttpClient
  selector: 'app-editar-epoca-visitar', // Selector para usar el componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    ReactiveFormsModule, // Módulo para formularios reactivos
    NgIf, // Directiva para manejar condiciones
    HttpClientModule, // Módulo para realizar peticiones HTTP
    MatDialogModule, // Módulo para manejar diálogos de Angular Material
  ],
  templateUrl: './editar-epoca-visitar.component.html', // Ruta del template HTML
  styleUrls: ['./editar-epoca-visitar.component.css'] // Ruta de los estilos CSS
})
export class EditarEpocaVisitarComponent implements OnInit {
  editarForm!: FormGroup; // FormGroup para manejar el formulario
  epocaVisitar!: EpocaVisitar; // Variable para almacenar la época a visitar

  constructor(
    public dialogRef: MatDialogRef<EditarEpocaVisitarComponent>, // Referencia al diálogo
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados en el diálogo
    private epocaVisitarService: EpocaVisitarService, // Servicio para manejar épocas
    private formBuilder: FormBuilder, // Constructor para crear formularios
  ) {
    this.epocaVisitar = data.epocaVisitar; // Asigna la época de visita desde los datos
  }

  ngOnInit(): void {
    // Inicializa el formulario con validaciones
    this.editarForm = this.formBuilder.group({
      nombre: [this.epocaVisitar.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: [this.epocaVisitar.descripcion, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      clima: [this.epocaVisitar.clima, [Validators.required]],
    });
  }

  onSubmit(): void {
    // Maneja la acción de enviar el formulario
    if (this.editarForm.valid) {
      const epocaActualizada = this.editarForm.value; // Obtiene los valores del formulario
      // Llama al servicio para actualizar la época de visita
      this.epocaVisitarService.actualizarEpocaVisitar(this.epocaVisitar.id, epocaActualizada).subscribe(
        () => {
          this.dialogRef.close('success'); // Cierra el diálogo con estado de éxito
          Swal.fire('¡Actualizado!', 'La Época de Visita se ha actualizado correctamente.', 'success'); // Muestra notificación de éxito
        },
        error => {
          // Manejo de errores al actualizar
          Swal.fire('¡Error!', 'Hubo un error al actualizar la Época de Visita.', 'error');
          console.error(error); // Muestra el error en consola
        }
      );
    } else {
      this.editarForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }

  onCancelar(): void {
    // Cierra el diálogo sin hacer cambios
    this.dialogRef.close();
  }

  onClearForm(): void {
    // Limpia el formulario
    this.editarForm.reset();
  }
}

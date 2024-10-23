import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {EpocaVisitarService} from "../epoca-visitar.service";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";

// Definición de la interfaz EpocaVisitar que representa una época de visita
interface EpocaVisitar {
  id: number; // Identificador único de la época
  nombre: string; // Nombre de la época
  descripcion: string; // Descripción de la época
  clima: string; // Clima asociado a la época
}

@Component({
  // Servicios que se utilizan en este componente
  providers: [EpocaVisitarService, HttpClient],
  selector: 'app-nueva-epoca-visitar', // Selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    FormsModule, // Módulo de formularios
    NgIf, // Directiva para mostrar contenido condicionalmente
    ReactiveFormsModule, // Módulo para formularios reactivos
    HttpClientModule // Módulo para realizar peticiones HTTP
  ],
  templateUrl: './nueva-epoca-visitar.component.html', // Ruta de la plantilla HTML del componente
  styleUrls: ['./nueva-epoca-visitar.component.css'] // Ruta de los estilos CSS del componente
})
export class NuevaEpocaVisitarComponent implements OnInit {
  crearForm!: FormGroup; // FormGroup que contiene los controles del formulario
  epocaVisitar!: EpocaVisitar; // Variable para almacenar la época de visita
  isSubmitting: boolean = false; // Indicador de envío del formulario

  constructor(
    private formBuilder: FormBuilder, // Constructor de FormBuilder para crear formularios
    //public dialogRef: MatDialogRef<NuevaEpocaVisitarComponent>, // Referencia al diálogo (comentado)
    //@Inject(MAT_DIALOG_DATA) public data: any, // Inyección de datos del diálogo (comentado)
    private epocaVisitarService: EpocaVisitarService, // Servicio para manejar la época de visita
    private router: Router, // Router para navegar entre rutas
  ) {}

  ngOnInit(): void {
    // Inicialización del componente
    this.crearForm = this.formBuilder.group({
      // Definición de los controles del formulario con validaciones
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      clima: ['', [Validators.required]], // Clima es obligatorio
    });
  }

  onSubmit(): void {
    // Metodo que se ejecuta al enviar el formulario
    if (this.crearForm.valid) { // Verifica si el formulario es válido
      const nombre = this.crearForm.get('nombre')!.value; // Obtiene el valor del nombre
      this.isSubmitting = true; // Iniciar la animación de carga

      // Verifica si la época de visita ya existe
      this.epocaVisitarService.verificarEpocaVisitarExistente(nombre).pipe(
        catchError((error) => {
          console.error(error); // Imprime el error en la consola
          return of(false); // Retorna un observable con valor falso en caso de error
        })
      ).subscribe({
        next: (isExistente) => { // Maneja la respuesta de la verificación
          if (isExistente) {
            // Si la época ya existe, muestra un mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'La Epoca ya existe',
              text: 'Ingrese un nombre diferente'
            });
          } else {
            const formData = this.crearForm.value; // Obtiene los datos del formulario
            this.guardarTipo(formData); // Llama al metodo para guardar la época
          }
          this.isSubmitting = false; // Detiene la animación de carga
        },
        error: (error) => {
          // Muestra un mensaje de error si falla la verificación
          Swal.fire({
            icon: 'error',
            title: 'Error al verificar La Epoca',
            text: error.message
          });
        }
      });
    } else {
      // Manejar caso en que el formulario no es válido
    }
  }

  guardarTipo(tipoData: EpocaVisitar): void {
    // Metodo para guardar la época de visita
    console.log('Datos de la Epoca:', tipoData); // Imprime los datos de la época en la consola
    this.epocaVisitarService.guardarEpocaVisitar(tipoData).subscribe(() => {
      // Si se guarda exitosamente, muestra un mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'La Epoca fue creado correctamente',
        showConfirmButton: false,
        timer: 2500 // Temporizador para cerrar la alerta
      });
      this.crearForm.reset(); // Resetea el formulario
    }, (error) => {
      // Muestra un mensaje de error si falla el guardado
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar La Epoca'
      });
    });
  }

  /*
    onCancelar(): void {
      this.dialogRef.close(); // Cierra el diálogo (comentado)
    }
  */

  limpiarFormulario() {
    // Metodo para limpiar el formulario
    this.crearForm.reset(); // Resetea los controles del formulario
  }

  volver() {
    // Metodo para volver a la ruta anterior
    this.router.navigate(['/epoca-visitar']); // Navega a la ruta de épocas de visita
  }
}

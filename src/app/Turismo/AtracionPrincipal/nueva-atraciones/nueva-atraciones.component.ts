import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AtracionesService} from "../atraciones.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";
import Swal from "sweetalert2";

// Interfaz que define la estructura de una atracción turística.
interface Atraciones {
  id: number; // Identificador único de la atracción.
  nombre: string; // Nombre de la atracción.
  descripcion: string; // Descripción de la atracción.
  horarioFuncionamiento: string; // Horario de funcionamiento (inicio).
  horarioFin: string; // Horario de funcionamiento (fin).
}

@Component({
  providers: [AtracionesService, HttpClient], // Proveedores necesarios para el componente.
  selector: 'app-nueva-atraciones', // Selector para utilizar el componente en plantillas.
  standalone: true, // Indica que este componente es independiente.
  imports: [
    FormsModule, // Módulo para utilizar formularios.
    NgIf, // Directiva para condicionales en plantillas.
    ReactiveFormsModule, // Módulo para formularios reactivos.
    HttpClientModule, // Módulo para realizar solicitudes HTTP.
  ],
  templateUrl: './nueva-atraciones.component.html', // Ruta del archivo de plantilla HTML.
  styleUrls: ['./nueva-atraciones.component.css'] // Ruta del archivo de estilos CSS.
})
export class NuevaAtracionesComponent implements OnInit {
  crearForm!: FormGroup; // Grupo de controles del formulario.
  atraciones!: Atraciones; // Variable para almacenar datos de atracciones.
  isSubmitting: boolean = false; // Indica si se está enviando el formulario.

  constructor(
    private formBuilder: FormBuilder, // Constructor para crear el formulario.
    // public dialogRef: MatDialogRef<NuevaAtracionesComponent>, // Referencia al diálogo (comentado).
    // @Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados para el diálogo (comentado).
    private atracionesService: AtracionesService, // Servicio para manejar atracciones.
    private router: Router, // Router para navegación.
  ) {}

  // Metodo que se ejecuta al inicializar el componente.
  ngOnInit(): void {
    // Inicializa el formulario con validaciones.
    this.crearForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]], // Campo nombre con validaciones.
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]], // Campo descripción con validaciones.
      horarioFuncionamiento: ['', [Validators.required]], // Campo horario de funcionamiento con validación requerida.
      horarioFin: ['', [Validators.required]], // Campo horario de fin con validación requerida.
    });
  }

  // Metodo que se ejecuta al enviar el formulario.
  onSubmit(): void {
    // Verifica si el formulario es válido.
    if (this.crearForm.valid) {
      const nombre = this.crearForm.get('nombre')!.value; // Obtiene el valor del campo nombre.
      this.isSubmitting = true; // Inicia la animación de carga.
      // Verifica si la atracción ya existe.
      this.atracionesService.verificarAtracionesExistente(nombre).pipe(
        catchError((error) => {
          console.error(error); // Manejo de errores.
          return of(false); // Retorna false si ocurre un error.
        })
      ).subscribe({
        next: (isExistente) => { // Maneja la respuesta de la verificación.
          if (isExistente) { // Si la atracción ya existe, muestra un mensaje de error.
            Swal.fire({
              icon: 'error',
              title: 'La Atracción ya existe',
              text: 'Ingrese un nombre diferente'
            });
          } else {
            const formData = this.crearForm.value; // Obtiene los datos del formulario.
            this.guardarTipo(formData); // Llama al metodo para guardar la atracción.
          }
          this.isSubmitting = false; // Detiene la animación de carga.
        },
        error: (error) => { // Manejo de errores en la verificación.
          Swal.fire({
            icon: 'error',
            title: 'Error al verificar La Atracción',
            text: error.message
          });
        }
      });
    } else {
      // Lógica adicional si el formulario no es válido (opcional).
    }
  }

  // Metodo para guardar los datos de la atracción.
  guardarTipo(tipoData: Atraciones): void {
    console.log('Datos de La Atracción:', tipoData); // Muestra los datos en la consola.
    this.atracionesService.guardarAtraciones(tipoData).subscribe(() => {
      // Muestra un mensaje de éxito si la atracción se guarda correctamente.
      Swal.fire({
        icon: 'success',
        title: 'La Atracción fue creada correctamente',
        showConfirmButton: false,
        timer: 2500 // Temporizador para cerrar el mensaje.
      });
      this.crearForm.reset(); // Reinicia el formulario.
    }, (error) => { // Manejo de errores al guardar.
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar La Atracción'
      });
    });
  }

  // Metodo para limpiar el formulario.
  limpiarFormulario() {
    this.crearForm.reset(); // Reinicia el formulario.
  }

  // Metodo para navegar de vuelta a la página de atracciones principales.
  volver() {
    this.router.navigate(['/atraciones-principales']); // Navega a la ruta especificada.
  }
}

import {Component, OnInit} from '@angular/core';
import {RolesService} from "../roles.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";
import Swal from "sweetalert2";

// Define la interfaz 'Rol', que describe la estructura de un objeto Rol
interface Rol {
  id: number;  // Identificador único del Rol
  rolName: string;  // Nombre del Rol
  rolDescripc: string;  // Descripción del Rol
  rolFechaCreac: Date;  // Fecha de creación del Rol
  rolFechaModic: Date;  // Fecha de última modificación del Rol
}

@Component({
  providers: [RolesService, HttpClient],  // Servicios inyectados en el componente
  selector: 'app-nuevo-rol',  // El selector del componente, usado para integrarlo en HTML
  standalone: true,  // Indica que este componente es independiente
  imports: [
    FormsModule,  // Módulo para trabajar con formularios
    NgIf,  // Directiva para condicionales en el template
    ReactiveFormsModule,  // Módulo para formularios reactivos
    HttpClientModule,  // Módulo para hacer peticiones HTTP
  ],
  templateUrl: './nuevo-rol.component.html',  // Archivo HTML del componente
  styleUrls: ['./nuevo-rol.component.css']  // Archivo de estilos CSS del componente
})
export class NuevoRolComponent implements OnInit {
  crearForm!: FormGroup;  // Formulario reactivo para crear un nuevo rol
  roles!: Rol;  // Variable para almacenar los datos del rol
  isSubmitting: boolean = false;  // Indica si el formulario está siendo enviado o no

  constructor(
    private formBuilder: FormBuilder,  // Constructor para construir el formulario reactivo
    private rolesService: RolesService,  // Servicio para interactuar con la API de Roles
    private router: Router,  // Router para navegar entre rutas
  ) {}

  // Metodo que se ejecuta cuando el componente es inicializado
  ngOnInit(): void {
    // Definición del formulario reactivo
    this.crearForm = this.formBuilder.group({
      rolName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],  // Campo para el nombre del rol con validaciones
      rolDescripc: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],  // Campo para la descripción con validaciones
      rolFechaCreac: ['', [Validators.required]],  // Campo para la fecha de creación, obligatorio
      rolFechaModic: ['', [Validators.required]],  // Campo para la fecha de modificación, obligatorio
    });
  }

  // Metodo que se ejecuta cuando el formulario es enviado
  onSubmit() {
    // Verifica si el formulario es válido
    if (this.crearForm.valid) {
      const rolName = this.crearForm.get('rolName')!.value;  // Obtiene el valor del campo 'rolName'
      this.isSubmitting = true;  // Cambia el estado a enviando el formulario (muestra una animación de carga)

      // Llama al servicio para verificar si el rol ya existe
      this.rolesService.verificarRolExistente(rolName).pipe(
        // Maneja el error en caso de falla en la verificación
        catchError((error) => {
          console.error(error);  // Muestra el error en la consola
          return of(false);  // Devuelve 'false' si ocurre un error
        })
      ).subscribe({
        next: (isExistente) => {
          if (isExistente) {
            // Si el rol ya existe, muestra un mensaje de error
            Swal.fire({
              icon: 'error',
              title: 'El Rol ya existe',
              text: 'Ingrese un nombre diferente'
            });
          } else {
            // Si el rol no existe, guarda los datos del rol
            const formData = this.crearForm.value;  // Obtiene los datos del formulario
            this.guardarTipo(formData);  // Llama a la función para guardar el rol
          }
          this.isSubmitting = false;  // Termina el estado de envío
        },
        error: (error) => {
          // Maneja cualquier error al verificar la existencia del rol
          Swal.fire({
            icon: 'error',
            title: 'Error al verificar El Rol',
            text: error.message
          });
        }
      });
    } else {
      // Si el formulario no es válido, no realiza nada
    }
  }

  // Metodo para guardar el rol en la base de datos
  guardarTipo(tipoData: Rol): void {
    console.log('Datos de el Rol:', tipoData);  // Muestra los datos del rol en la consola
    // Llama al servicio para guardar el rol
    this.rolesService.guardarRol(tipoData).subscribe(() => {
      // Si el rol se guarda exitosamente, muestra un mensaje de éxito
      Swal.fire({
        icon: 'success',
        title: 'El Rol fue creado correctamente',
        showConfirmButton: false,  // No muestra botón de confirmación
        timer: 2500  // Se cierra automáticamente después de 2.5 segundos
      });
      this.crearForm.reset();  // Resetea el formulario después de guardar el rol
    }, (error) => {
      // Si ocurre un error al guardar el rol, muestra un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar El Rol'
      });
    });
  }

  // Metodo para limpiar el formulario
  limpiarFormulario() {
    this.crearForm.reset();  // Resetea el formulario
  }

  // Metodo para volver a la lista de roles
  volver() {
    this.router.navigate(['/roles']);  // Navega a la ruta '/roles'
  }
}

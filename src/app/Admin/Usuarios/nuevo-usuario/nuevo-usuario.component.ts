import { Component, OnInit } from '@angular/core';
import { UsuarioService } from "../usuario.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, of } from "rxjs";
import Swal from "sweetalert2";
import { NgForOf, NgIf } from "@angular/common";

// Interface que define la estructura de un Rol
interface Rol {
  id: number;                   // Identificador único del rol
  rolName: string;              // Nombre del rol
  rolDescripc: string;          // Descripción del rol
  rolFechaCreac: Date;          // Fecha de creación del rol
  rolFechaModic: Date;          // Fecha de modificación del rol
}

// Interface que define la estructura de un Usuario
interface Usuarios {
  id: number;                   // Identificador único del usuario
  nombreUsuario: string;        // Nombre de usuario
  email: string;                // Correo electrónico
  password: string;             // Contraseña del usuario
  fechaRegistro: Date;          // Fecha de registro del usuario
  rol: Rol;                     // Rol asociado al usuario
}

@Component({
  providers: [UsuarioService, HttpClient], // Servicios utilizados en el componente
  selector: 'app-nuevo-usuario',            // Selector del componente
  standalone: true,                         // Indica que es un componente independiente
  imports: [                                 // Módulos utilizados en el componente
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    HttpClientModule,
    NgForOf,
  ],
  templateUrl: './nuevo-usuario.component.html', // Archivo HTML asociado
  styleUrls: ['./nuevo-usuario.component.css']    // Archivo CSS asociado
})
export class NuevoUsuarioComponent implements OnInit {
  crearForm!: FormGroup;                     // FormGroup para manejar el formulario
  usuarios!: Usuarios;                       // Objeto para almacenar información del usuario
  roles: Rol[] = [];                         // Arreglo para almacenar los roles disponibles
  isSubmitting: boolean = false;              // Bandera para controlar el estado de envío del formulario

  // Variables para validar la complejidad de la contraseña
  hasLetters = false;
  hasNumbers = false;
  hasSymbols = false;
  tooShort = false;

  codigoConfirmacion?: string;               // Código de confirmación para rol de Administrador
  codigoIncorrecto: boolean = false;         // Bandera para indicar si el código es incorrecto

  constructor(
    private formBuilder: FormBuilder,       // Inyección de dependencia para FormBuilder
    private usuarioService: UsuarioService, // Servicio de usuarios
    private router: Router,                  // Servicio de enrutamiento
  ) { }

  ngOnInit(): void {
    // Inicialización del formulario con validaciones
    this.crearForm = this.formBuilder.group({
      nombreUsuario: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(10), Validators.maxLength(250)]],
      password: ['', [Validators.required]],
      fechaRegistro: [new Date()],           // Fecha de registro se establece como la fecha actual
      rol: ['', [Validators.required]],       // Validación para el rol
      codigoConfirmacion: ['']                // Campo para el código de confirmación
    });

    // Observador para detectar cambios en el campo de contraseña y validar
    this.crearForm.get('password')?.valueChanges.subscribe(value => {
      this.validatePassword(value);
    });

    // Observador para detectar cambios en el rol seleccionado
    this.crearForm.get('rol')?.valueChanges.subscribe(() => {
      this.onRolChange();
    });

    this.cargarRoles(); // Carga los roles disponibles
  }

  // Función para validar la complejidad de la contraseña
  validatePassword(value: string) {
    if (value !== null) {
      this.hasLetters = /[a-zA-Z]/.test(value);  // Verifica si hay letras
      this.hasNumbers = /\d/.test(value);        // Verifica si hay números
      this.hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value); // Verifica si hay símbolos
      this.tooShort = value.length < 10;        // Verifica si la longitud es menor a 10 caracteres

      // Establece errores en el campo de contraseña si no cumple con las validaciones
      if (this.tooShort || !this.hasLetters || !this.hasNumbers || !this.hasSymbols) {
        this.crearForm.get('password')?.setErrors({ invalidPassword: true });
      } else {
        this.crearForm.get('password')?.setErrors(null);
      }
    }
  }

  // Función para cargar los roles disponibles desde el servicio
  cargarRoles(): void {
    this.usuarioService.recuperarTodosRoles().subscribe(
      (roles: Rol[]) => {
        this.roles = roles; // Almacena los roles en la variable local
      },
      (error) => {
        console.error(error); // Maneja el error
      }
    );
  }

  // Metodo para manejar el envío del formulario
  onSubmit() {
    if (this.crearForm.valid) { // Verifica si el formulario es válido
      const nombreUsuario = this.crearForm.get('nombreUsuario')!.value;
      const email = this.crearForm.get('email')!.value;
      this.isSubmitting = true; // Establece el estado de envío

      // Verifica si el nombre de usuario ya existe
      this.usuarioService.verificarUsuarioExistente(nombreUsuario).pipe(
        catchError((error) => {
          console.error(error);
          return of(false); // Maneja el error y devuelve false
        })
      ).subscribe((isExistenteNombre) => {
        if (isExistenteNombre) {
          Swal.fire({
            icon: 'error',
            title: 'El Usuario ya existe',
            text: 'Ingrese un nombre diferente' // Mensaje de error si el usuario ya existe
          });
          this.isSubmitting = false; // Restablece el estado de envío
        } else {
          // Verifica si el correo electrónico ya existe
          this.usuarioService.verificarUsuarioPorEmail(email).pipe(
            catchError((error) => {
              console.error(error);
              return of(false); // Maneja el error y devuelve false
            })
          ).subscribe((isExistenteEmail) => {
            if (isExistenteEmail) {
              Swal.fire({
                icon: 'error',
                title: 'El Email ya existe',
                text: 'Ingrese un email diferente' // Mensaje de error si el email ya existe
              });
              this.isSubmitting = false; // Restablece el estado de envío
            } else {
              // Validar el código de confirmación para el rol de Administrador
              if (this.crearForm.get('rol')?.value === 'ADMINISTRADOR' && this.crearForm.get('codigoConfirmacion')?.value !== '2024') {
                this.codigoIncorrecto = true; // Marca como incorrecto si el código no es el esperado
                this.isSubmitting = false; // Restablece el estado de envío
              } else {
                const formData = this.crearForm.value; // Obtiene los datos del formulario
                this.guardarUsuario(formData); // Llama a la función para guardar el usuario
              }
            }
          });
        }
      });
    } else {
      // Mensaje de error si el formulario no es válido
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor complete todos los campos requeridos'
      });
    }
  }

  // Función para guardar el usuario a través del servicio
  guardarUsuario(usuarioData: Usuarios): void {
    this.usuarioService.guardarUsuario(usuarioData).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'El Usuario fue creado correctamente',
        showConfirmButton: false,
        timer: 2500 // Mensaje de éxito con temporizador
      }).then(() => {
        this.crearForm.reset(); // Restablece el formulario
        this.isSubmitting = false; // Restablece el estado de envío
        // Redirigir al login
        this.router.navigate(['/login']); // Navega a la página de login
      });
    }, (error) => {
      // Mensaje de error si ocurre un problema al guardar el usuario
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al guardar el Usuario'
      });
      this.isSubmitting = false; // Restablece el estado de envío
    });
  }

  // Metodo para limpiar el formulario
  limpiarFormulario() {
    this.crearForm.reset(); // Restablece todos los campos del formulario
  }

  // Metodo para volver a la página anterior
  volver() {
    this.router.navigate(['/tu-inicio']); // Navega a la página de inicio
  }

  // Metodo para ir a la página de login
  goToLogin() {
    this.router.navigate(['/login']); // Navega a la página de login
  }

  // Metodo para manejar el cambio de rol
  onRolChange() {
    this.codigoIncorrecto = false; // Restablece la bandera de código incorrecto
  }
}

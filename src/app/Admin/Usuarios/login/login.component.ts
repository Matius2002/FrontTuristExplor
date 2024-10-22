import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../usuario.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

// Define la interfaz Rol que representa un rol de usuario
interface Rol {
  id: number; // ID único del rol
  rolName: string; // Nombre del rol
  rolDescripc: string; // Descripción del rol
  rolFechaCreac: Date; // Fecha de creación del rol
  rolFechaModic: Date; // Fecha de modificación del rol
}

// Define la interfaz Usuarios que representa a un usuario
interface Usuarios {
  id: number; // ID único del usuario
  nombreUsuario: string; // Nombre del usuario
  email: string; // Correo electrónico del usuario
  password: string; // Contraseña del usuario
  fechaRegistro: Date; // Fecha de registro del usuario
  rol: Rol; // Rol asignado al usuario
}

@Component({
  providers: [UsuarioService, HttpClient], // Proveedores de servicios para el componente
  selector: 'app-login', // Selector del componente para uso en templates
  standalone: true, // Indica que este componente es independiente
  imports: [
    FormsModule, // Módulo para manejar formularios
    NgIf, // Directiva para condicionales en templates
    ReactiveFormsModule, // Módulo para formularios reactivos
    HttpClientModule, // Módulo para realizar peticiones HTTP
    NgForOf, // Directiva para iterar sobre listas
  ],
  templateUrl: './login.component.html', // Ruta al template del componente
  styleUrl: './login.component.css' // Ruta a los estilos del componente
})
export class LoginComponent implements OnInit {
  crearForm!: FormGroup; // FormGroup para el formulario de inicio de sesión
  usuarios!: Usuarios; // Variable para almacenar datos del usuario

  // Constructor del componente que inyecta los servicios necesarios
  constructor(
    private formBuilder: FormBuilder, // Servicio para construir formularios
    //public dialogRef: MatDialogRef<LoginComponent>, // Referencia a un diálogo (comentado)
    //@Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados en un diálogo (comentado)
    private usuarioService: UsuarioService, // Servicio de usuario para autenticación
    private router: Router, // Servicio de enrutamiento para navegación
  ) {}

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Inicializa el formulario con validaciones
    this.crearForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]], // Campo de correo electrónico
      password: ['', [Validators.required, Validators.minLength(1)]] // Campo de contraseña
    });
  }

  // Metodo que se ejecuta al enviar el formulario
  onSubmit() {
    // Verifica si el formulario es inválido
    if (this.crearForm.invalid) {
      // Muestra una alerta de error si el formulario no es válido
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Complete todos los campos correctamente.',
      });
      return; // Detiene la ejecución si hay un error
    }

    // Crea un objeto con las credenciales del usuario
    const credentials = {
      email: this.crearForm.value.email, // Obtiene el correo electrónico del formulario
      password: this.crearForm.value.password, // Obtiene la contraseña del formulario
    };

    // Llama al servicio de usuario para iniciar sesión
    this.usuarioService.login(credentials).subscribe(
      response => {
        console.log('Respuesta del servidor:', response); // Verifica la respuesta

        // Verifica el token antes de almacenarlo
        if (response && response.token) {
          this.usuarioService.guardarUsuarioEnStorage(response.token); // Guarda el usuario en el almacenamiento
          this.usuarioService.guardarToken(response.token); // Guarda el token en el almacenamiento
          console.log('Token guardado correctamente:', response.token); // Confirma que se guardó el token

          // Muestra una alerta de éxito y redirige al usuario
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
          }).then(() => {
            this.router.navigate(['/tu-inicio']); // Redirige a la página de inicio
          });
        } else {
          console.log('Error: No se recibió un token válido');
          // Muestra un error si no se recibió un token válido
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'No se recibió un token válido.',
          });
        }
      },
      error => {
        console.error('Error al iniciar sesión:', error); // Imprime el error en la consola
        // Muestra una alerta de error en caso de fallo
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al iniciar sesión.',
        });
      }
    );
  }

  // Metodo para limpiar el formulario
  limpiarFormulario() {
    this.crearForm.reset(); // Resetea el formulario
  }

  // Metodo para volver a la página de inicio
  volver() {
    this.router.navigate(['/tu-inicio']); // Redirige a la página de inicio
  }

  // Metodo para navegar a la página de registro
  goToRegister() {
    this.router.navigate(['/nuevo-usuario']); // Redirige a la página de registro
  }

  // Metodo para navegar a la página de recuperación de contraseña (vacío)
  goToForgetPassword() {
  }
}

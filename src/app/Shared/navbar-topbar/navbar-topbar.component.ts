import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UsuarioService} from "../../Admin/Usuarios/usuario.service";
import {NgIf} from "@angular/common";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";

@Component({
  providers: [HttpClient, UsuarioService], // Inyecta el servicio HttpClient y UsuarioService en el componente
  selector: 'app-navbar-topbar', // Define el selector para el componente, utilizado en el HTML
  standalone: true, // Este componente es independiente (standalone), no depende de un módulo
  imports: [
    HttpClientModule, // Importa el módulo HttpClient para hacer solicitudes HTTP
    NgIf, // Importa NgIf, una directiva estructural que permite el renderizado condicional
  ],
  templateUrl: './navbar-topbar.component.html', // El archivo HTML asociado al componente
  styleUrls: ['./navbar-topbar.component.css'] // El archivo CSS asociado al componente
})
export class NavbarTopbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false; // Variable que indica si el usuario está autenticado
  private loginSub: Subscription | null = null; // Suscripción para monitorear el estado de autenticación

  constructor(
    private router: Router, // Servicio Router para la navegación entre rutas
    private usuarioService: UsuarioService // Servicio personalizado para manejar operaciones de usuario
  ) {}

  // Hook que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Suscribirse al observable isLoggedIn$ para escuchar los cambios en el estado de autenticación
    this.loginSub = this.usuarioService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn; // Actualiza el estado local de isLoggedIn según la respuesta
        console.log('isLoggedIn:', this.isLoggedIn); // Imprime el estado en la consola para debug
      }
    );
  }

  // Hook que se ejecuta cuando el componente se destruye
  ngOnDestroy(): void {
    if (this.loginSub) {
      // Asegura que se libere la suscripción para evitar fugas de memoria
      this.loginSub.unsubscribe();
    }
  }

  // Metodo para cerrar sesión
  logout(): void {
    this.usuarioService.logout(); // Llama al servicio de usuario para cerrar sesión
    // Muestra una alerta informando al usuario que la sesión ha sido cerrada
    Swal.fire({
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión exitosamente.',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      // Redirige al usuario a la página de inicio de sesión
      this.router.navigate(['/login']);
    });
  }

  // Metodo para navegar a una ruta específica
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Navega a la ruta especificada (login, registro, etc.)
  }
}


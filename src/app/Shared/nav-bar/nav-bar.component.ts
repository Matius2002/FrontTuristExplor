import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {Subscription} from "rxjs";
import {UsuarioService} from "../../Admin/Usuarios/usuario.service";

@Component({
  selector: 'app-nav-bar', // Selector del componente, utilizado en el HTML para incrustar este componente
  standalone: true, // Indica que este componente es autónomo y no depende de un módulo NgModule
  imports: [
    NgOptimizedImage // Importación de optimización de imágenes (si se está utilizando)
  ],
  templateUrl: './nav-bar.component.html', // Ruta del archivo de plantilla HTML del componente
  styleUrls: ['./nav-bar.component.css'] // Ruta del archivo de estilos CSS del componente
})
export class NavBarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false; // Variable que indica si el usuario está logueado
  private loginSub: Subscription | null = null; // Suscripción para gestionar el estado de logueo del usuario

  // Constructor del componente, donde se inyectan las dependencias necesarias
  constructor(
    private formBuilder: FormBuilder, // Servicio para construir formularios
    private router: Router, // Servicio de enrutamiento para navegar entre rutas
    private usuarioService: UsuarioService // Servicio personalizado para gestionar usuarios
  ) {}

  // Metodo de ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Suscripción al observable que indica si el usuario está logueado
    this.loginSub = this.usuarioService.isLoggedIn$.subscribe(
      (loggedIn) => {
        this.isLoggedIn = loggedIn; // Actualiza el estado de isLoggedIn basado en el valor recibido
        console.log('isLoggedIn:', this.isLoggedIn); // Verifica el valor en la consola
      }
    );
  }

  // Metodo de ciclo de vida que se ejecuta al destruir el componente
  ngOnDestroy(): void {
    // Desuscribe para evitar fugas de memoria
    if (this.loginSub) {
      this.loginSub.unsubscribe(); // Libera la suscripción
    }
  }

  // Metodo para navegar a una ruta específica
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Utiliza el servicio de enrutamiento para navegar
  }

  // Metodo para cerrar sesión
  logout(): void {
    this.usuarioService.logout(); // Llama al servicio para cerrar sesión
    // Muestra un alert con la librería SweetAlert
    Swal.fire({
      icon: 'success', // Tipo de icono para el alert
      title: 'Sesión cerrada', // Título del alert
      timer: 1000, // Duración del alert en milisegundos
      timerProgressBar: true, // Muestra una barra de progreso
      showConfirmButton: false, // No muestra botón de confirmación
      allowOutsideClick: false, // No permite cerrar al hacer clic fuera del alert
      allowEscapeKey: false, // No permite cerrar con la tecla Escape
      willClose: () => {
        this.router.navigate(['/login']); // Navega a la ruta de login al cerrar el alert
      }
    });
  }
  // Fin del metodo
}

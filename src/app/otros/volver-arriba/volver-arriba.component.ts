import {Component, HostListener} from '@angular/core';
import {NgIf} from "@angular/common";

// Decorador del componente, que define sus metadatos
@Component({
  selector: 'app-volver-arriba', // Selector que se usará en el HTML para incluir este componente
  standalone: true, // Indica que este componente es independiente
  imports: [
    NgIf // Importa NgIf para su uso en la plantilla del componente
  ],
  templateUrl: './volver-arriba.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./volver-arriba.component.css'] // Ruta al archivo de estilos CSS
})
export class VolverArribaComponent {
  windowScrolled: boolean; // Variable que indica si se ha desplazado la ventana

  // Constructor del componente
  constructor() {
    this.windowScrolled = false; // Inicializa windowScrolled como falso
  }

  // Escucha el evento de desplazamiento de la ventana
  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Comprueba la posición de desplazamiento de la ventana
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true; // Si se ha desplazado más de 100 píxeles, establece windowScrolled a verdadero
    } else if (this.windowScrolled && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < 10) {
      this.windowScrolled = false; // Si se ha desplazado hacia arriba y está cerca de la parte superior, establece windowScrolled a falso
    }
  }

  // Método que desplaza suavemente la ventana hacia arriba
  scrollToTop() {
    (function smoothscroll() {
      // Obtiene la posición de desplazamiento actual
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll); // Solicita el siguiente frame de animación
        window.scrollTo(0, currentScroll - (currentScroll / 8)); // Desplaza la ventana suavemente
      }
    })();
  }
}

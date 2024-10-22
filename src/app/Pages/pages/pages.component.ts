import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../Shared/footer/footer.component";
import {BreadcrumbsComponent} from "../../Shared/breadcrumbs/breadcrumbs.component";
import {RouterOutlet} from "@angular/router";
import {NavBarComponent} from "../../Shared/nav-bar/nav-bar.component";
import {NavbarTopbarComponent} from "../../Shared/navbar-topbar/navbar-topbar.component";
import {VolverArribaComponent} from "../../otros/volver-arriba/volver-arriba.component";

// Decorador que define el componente
@Component({
  selector: 'app-pages', // El selector para usar este componente en el HTML
  standalone: true, // Especifica que este componente es independiente (no depende de un módulo explícito)

  // Importaciones de otros componentes que este utilizará
  imports: [
    FooterComponent, // Componente de pie de página
    BreadcrumbsComponent, // Componente de migas de pan (breadcrumbs)
    RouterOutlet, // Permite cargar dinámicamente otros componentes basados en las rutas
    NavBarComponent, // Componente de la barra de navegación
    NavbarTopbarComponent, // Componente de la barra superior de navegación
    VolverArribaComponent // Componente para el botón de volver arriba
  ],

  // Plantilla y estilos para este componente
  templateUrl: './pages.component.html', // Ubicación del archivo HTML para este componente
  styleUrl: './pages.component.css' // Ubicación del archivo CSS para este componente
})
export class PagesComponent implements OnInit { // Implementa la interfaz OnInit, lo que permite usar ngOnInit

  // Propiedades que almacenan la altura del navbar y el footer
  navbarHeight: number = 0; // Altura de la barra de navegación
  footerHeight: number = 0; // Altura del pie de página

  // Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Obtiene el elemento del DOM correspondiente al navbar
    const navbar = document.querySelector('app-navbar-topbar') as HTMLElement;

    // Obtiene el elemento del DOM correspondiente al footer
    const footer = document.querySelector('app-footer') as HTMLElement;

    // Verifica si el navbar fue encontrado en el DOM y obtiene su altura
    if (navbar !== null) {
      this.navbarHeight = navbar.offsetHeight || 0; // Si no se puede obtener la altura, la establece en 0
    }

    // Verifica si el footer fue encontrado en el DOM y obtiene su altura
    if (footer !== null) {
      this.footerHeight = footer.offsetHeight || 0; // Si no se puede obtener la altura, la establece en 0
    }
  }
}

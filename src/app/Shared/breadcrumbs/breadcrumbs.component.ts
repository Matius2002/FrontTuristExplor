import {Component, Input} from '@angular/core';

/**
 * Componente para mostrar los breadcrumbs (navegación jerárquica) en la aplicación.
 */
@Component({
  selector: 'app-breadcrumbs', // Selector del componente, se usará en HTML
  standalone: true, // Indica que este componente se puede usar de forma independiente
  imports: [], // Se pueden importar otros módulos, si es necesario
  templateUrl: './breadcrumbs.component.html', // Ruta al archivo de plantilla HTML del componente
  styleUrls: ['./breadcrumbs.component.css'] // Ruta al archivo de estilos CSS del componente
})
export class BreadcrumbsComponent {
  // Propiedad de entrada (input) para recibir contenido desde el componente padre
  //@Input() contenidoBreadcrumbs: string | undefined; // Esta propiedad se puede usar para pasar datos al componente
}

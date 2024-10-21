import { Component } from '@angular/core';

// Define el componente NuevoPermisoComponent
@Component({
  // Selector que define el nombre del componente cuando se usa en una plantilla HTML
  selector: 'app-nuevo-permiso',

  // Marca este componente como 'standalone', es decir, que no necesita de otros módulos o componentes para funcionar
  standalone: true,

  // En el campo 'imports' se listan los módulos que este componente necesita importar (en este caso está vacío porque no requiere módulos externos)
  imports: [],

  // Ubicación del archivo de plantilla HTML que define la vista del componente
  templateUrl: './nuevo-permiso.component.html',

  // Ubicación del archivo CSS que define los estilos específicos de este componente
  styleUrl: './nuevo-permiso.component.css'
})
export class NuevoPermisoComponent {
  // Este es el componente de clase vacío. No tiene lógica o propiedades por ahora, solo define el marco para un componente Angular.
}


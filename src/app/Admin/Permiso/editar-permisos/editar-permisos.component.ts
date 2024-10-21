import { Component } from '@angular/core';

// Decorador @Component: Define un componente Angular con sus metadatos
@Component({
  // Selector utilizado para identificar el componente en el HTML
  selector: 'app-editar-permisos',  // Nombre que se usará para incluir este componente en otros componentes o plantillas HTML

  // Indica que este componente es autónomo, lo que significa que puede funcionar de forma independiente sin depender de otros módulos
  standalone: true,

  // Los módulos importados necesarios para este componente (en este caso está vacío, lo que significa que no hay módulos adicionales importados)
  imports: [],

  // Ruta al archivo de plantilla HTML que define la estructura visual del componente
  templateUrl: './editar-permisos.component.html',  // Enlace a la plantilla HTML

  // Ruta al archivo de estilo CSS que define los estilos visuales del componente
  styleUrl: './editar-permisos.component.css'  // Enlace a los estilos CSS
})

// Definición de la clase EditarPermisosComponent
export class EditarPermisosComponent {
  // Esta clase está vacía por ahora, pero puede contener lógica de negocio o métodos para el comportamiento del componente
}


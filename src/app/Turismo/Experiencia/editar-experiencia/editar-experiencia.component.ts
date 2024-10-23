import { Component } from '@angular/core';

// Decorador @Component define un componente de Angular
@Component({
  // El selector define cómo se llamará este componente en el HTML
  selector: 'app-editar-experiencia',

  // 'standalone: true' indica que este es un componente autónomo que no requiere un módulo para su uso
  standalone: true,

  // imports es donde puedes especificar otros módulos o componentes que se necesitan para este componente
  imports: [],

  // templateUrl apunta al archivo HTML que contiene el template del componente
  templateUrl: './editar-experiencia.component.html',

  // styleUrls apunta al archivo CSS que contiene los estilos específicos para este componente
  styleUrls: ['./editar-experiencia.component.css']
})
// Clase que define la lógica del componente EditarExperienciaComponent
export class EditarExperienciaComponent {
}

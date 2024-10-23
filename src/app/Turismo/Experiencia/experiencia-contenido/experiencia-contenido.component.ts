import { Component } from '@angular/core';

// Decorador @Component define las características principales del componente
@Component({
  // 'app-experiencia-contenido' será el nombre del selector que se usará en el HTML para insertar este componente
  selector: 'app-experiencia-contenido',

  // standalone: true indica que este componente no forma parte de un módulo, es autónomo
  standalone: true,

  // imports define qué otros módulos o componentes se importan para usar en este componente (aquí está vacío)
  imports: [],

  // templateUrl hace referencia a la ruta del archivo HTML asociado al componente
  templateUrl: './experiencia-contenido.component.html',

  // styleUrl hace referencia a la ruta del archivo CSS asociado al componente
  styleUrl: './experiencia-contenido.component.css'
})

// Definición de la clase del componente 'ExperienciaContenidoComponent'
export class ExperienciaContenidoComponent {
  // Actualmente, la clase está vacía, pero aquí es donde iría la lógica del componente
}


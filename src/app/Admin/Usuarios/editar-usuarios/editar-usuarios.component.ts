import { Component } from '@angular/core';

@Component({
  // Definición del selector para usar este componente en el HTML
  selector: 'app-editar-usuarios',

  // Declaración de este componente como un componente independiente (standalone)
  // Esto significa que no forma parte de ningún módulo, se puede usar directamente.
  standalone: true,

  // Importaciones necesarias para este componente. Aquí está vacío, pero se podrían importar
  // otros módulos de Angular como formularios, servicios, etc.
  imports: [],

  // Ruta al archivo HTML que define la vista (plantilla) del componente
  templateUrl: './editar-usuarios.component.html',

  // Ruta al archivo CSS que define los estilos específicos del componente
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent {
  // Aquí se pueden definir propiedades, métodos y lógica del componente
}

import { Component } from '@angular/core';

// Decorador @Component que define las propiedades de configuración del componente
@Component({
  selector: 'app-reporte-usuarios', // Nombre del selector que se usará en el HTML para instanciar este componente
  standalone: true, // Indica que este componente es independiente y puede ser usado sin estar dentro de un módulo
  imports: [], // Importaciones de otros módulos o componentes (en este caso no hay importaciones)
  templateUrl: './reporte-usuarios.component.html', // Ruta al archivo HTML de la plantilla del componente
  styleUrl: './reporte-usuarios.component.css' // Ruta al archivo de estilos CSS del componente
})
export class ReporteUsuariosComponent {
  // Aquí se pueden definir propiedades, métodos y lógica del componente
  // En este momento, el componente está vacío
}

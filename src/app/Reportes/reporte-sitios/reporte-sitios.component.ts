import { Component } from '@angular/core';

// Decorador que marca esta clase como un componente Angular
@Component({
  selector: 'app-reporte-sitios', // El selector para usar este componente en plantillas HTML
  standalone: true, // Indica que el componente es independiente (standalone), no necesita declararse en un módulo
  imports: [ // Aquí se pueden importar otros componentes o módulos si fueran necesarios

  ],
  templateUrl: './reporte-sitios.component.html', // Ruta al archivo HTML que contiene la plantilla de este componente
  styleUrl: './reporte-sitios.component.css' // Ruta al archivo CSS que contiene los estilos para este componente
})
export class ReporteSitiosComponent {
  // Clase vacía para el componente ReporteSitios
  // Aquí iría la lógica y las propiedades del componente
}

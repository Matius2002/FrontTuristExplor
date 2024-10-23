import { Component } from '@angular/core';

// Decorador @Component que define los metadatos del componente
@Component({
  selector: 'app-detalles-alojamiento', // Define el nombre del selector para usar este componente en el HTML
  standalone: true, // Indica que este componente es independiente y no forma parte de un módulo
  imports: [], // Aquí se pueden importar otros módulos o componentes si se necesitan
  templateUrl: './detalles-alojamiento.component.html', // Ruta al archivo HTML que contiene la vista del componente
  styleUrl: './detalles-alojamiento.component.css' // Ruta al archivo CSS que contiene los estilos del componente
})

// Definición de la clase del componente
export class DetallesAlojamientoComponent {
  // Aquí puedes agregar propiedades y métodos que manejarán la lógica del componente
}

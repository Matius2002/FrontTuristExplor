import { Component } from '@angular/core';

// Decorador @Component que define el metadato del componente
@Component({
  selector: 'app-reset-password',  // Define el selector que se usará para insertar este componente en HTML
  standalone: true,  // Indica que este componente es independiente, no requiere declararse en un módulo
  imports: [],  // Aquí se especificarían los módulos que el componente necesita importar (vacío por ahora)
  templateUrl: './reset-password.component.html',  // Ruta del archivo de la plantilla HTML asociada
  styleUrl: './reset-password.component.css'  // Ruta del archivo de estilos CSS específico para este componente
})
export class ResetPasswordComponent {
  // Aquí se podría definir la lógica del componente, como propiedades y métodos.

  // El componente actualmente no tiene ninguna lógica implementada.
}


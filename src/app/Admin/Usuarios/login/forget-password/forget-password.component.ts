import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password',  // El selector del componente, usado para identificar este componente en el HTML
  standalone: true,  // Indica que este componente no necesita estar en un módulo, se puede usar por sí solo
  imports: [],  // Aquí se pueden agregar otros módulos o componentes que el componente necesite para funcionar (por ahora está vacío)
  templateUrl: './forget-password.component.html',  // El archivo HTML asociado a este componente, que define su vista
  styleUrl: './forget-password.component.css'  // El archivo CSS asociado que contiene los estilos del componente
})
export class ForgetPasswordComponent {
  // Esta es la clase del componente donde se puede definir la lógica del mismo. En este caso, está vacía.
}


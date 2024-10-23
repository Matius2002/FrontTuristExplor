import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Router} from "@angular/router";

// Decorador que define el componente 'SistemaComponent'
@Component({
  providers: [HttpClient], // Proveedor del servicio HttpClient para realizar solicitudes HTTP
  selector: 'app-sistema', // Define el selector del componente que se usará en el HTML para insertar este componente
  standalone: true, // Hace que el componente sea independiente y no dependa de un módulo Angular
  imports: [
    FormsModule, // Importa el módulo de formularios template-driven
    NgIf, // Importa la directiva estructural NgIf para mostrar/ocultar elementos en el HTML
    ReactiveFormsModule, // Importa el módulo para trabajar con formularios reactivos
    HttpClientModule, // Importa el módulo que permite hacer peticiones HTTP
  ],
  templateUrl: './sistema.component.html', // Ruta al archivo HTML que define la estructura de la vista del componente
  styleUrls: ['./sistema.component.css'] // Ruta al archivo CSS que define los estilos del componente
})
// Definición de la clase del componente 'SistemaComponent'
export class SistemaComponent implements OnInit {
  isHelpModalVisible: boolean = false; // Variable que controla si la ventana modal de ayuda está visible o no

  // Constructor de la clase, inyecta las dependencias necesarias
  constructor(
    private formBuilder: FormBuilder, // Inyección de FormBuilder para crear formularios reactivos
    private router: Router, // Inyección del Router para la navegación de rutas
  ) {}

  // Metodo del ciclo de vida que se ejecuta cuando el componente se inicializa
  ngOnInit(): void {
    // Actualmente no realiza ninguna acción, pero aquí puedes inicializar variables o cargar datos
  }

  // Metodo que navega a una ruta específica cuando se invoca
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Navega a la ruta proporcionada como argumento
  }

  // Metodo que alterna la visibilidad de la ventana modal de ayuda
  toggleHelpModal() {
    this.isHelpModalVisible = !this.isHelpModalVisible; // Cambia el valor de isHelpModalVisible entre true y false
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { ExperienciaService } from "../experiencia.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UsuarioService } from "../../../Admin/Usuarios/usuario.service";

// Interfaces para representar la estructura de los datos

interface Usuario {
  id: number; // ID del usuario
  nombreUsuario: string; // Nombre del usuario
  email: string; // Correo del usuario
}

interface Destinos {
  id: number; // ID del destino
  destinoName: string; // Nombre del destino
}

interface Experiencia {
  id: number; // ID de la experiencia
  calificacion: string; // Calificación dada por el usuario
  comentario: string; // Comentario sobre la experiencia
  fecha: string; // Fecha de la experiencia
  usuario: Usuario; // Usuario que registró la experiencia
  destinos: Destinos; // Destino asociado a la experiencia
}

@Component({
  providers: [ExperienciaService, HttpClient, UsuarioService], // Proveedores de servicios utilizados en el componente
  selector: 'app-nueva-experiencia',
  standalone: true,
  imports: [
    FormsModule, // Módulo para formularios no reactivos
    NgIf, // Directiva para condicionales
    ReactiveFormsModule, // Módulo para formularios reactivos
    NgClass, // Directiva para agregar clases condicionalmente
    NgForOf, // Directiva para iterar sobre listas
    HttpClientModule // Módulo para realizar peticiones HTTP
  ],
  templateUrl: './nueva-experiencia.component.html',
  styleUrl: './nueva-experiencia.component.css'
})
export class NuevaExperienciaComponent implements OnInit {
  crearForm!: FormGroup; // Formulario reactivo para capturar la nueva experiencia
  experiencias!: Experiencia; // Variable para almacenar una experiencia
  usuarios: Usuario[] = []; // Lista de usuarios
  destinos: Destinos[] = []; // Lista de destinos
  isSubmitting: boolean = false; // Indicador para el estado de envío del formulario
  currentUser: Usuario | null = null; // Usuario actualmente autenticado

  constructor(
    private formBuilder: FormBuilder, // Constructor para construir formularios
    private experienciaService: ExperienciaService, // Servicio para manejar las experiencias
    private router: Router, // Servicio para navegar entre rutas
    private usuariosService: UsuarioService // Servicio para manejar datos de usuarios
  ) {}

  // Inicializa el componente y define el formulario reactivo
  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({
      comentario: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(80)]], // Validaciones para el campo de comentario
      destinos: ['', [Validators.required]], // Validación para que el destino sea requerido
      calificacion: ['', Validators.required] // Validación para que la calificación sea requerida
    });

    this.currentUser = this.usuariosService.getCurrentUser(); // Obtiene el usuario actualmente autenticado

    this.cargarDestinos(); // Carga la lista de destinos al iniciar el componente
  }

  // Metodo para cargar los destinos disponibles desde el servicio
  cargarDestinos(): void {
    this.experienciaService.recuperarTodosDestinos().subscribe(
      (destinos: Destinos[]) => {
        console.log('Destinos cargados:', destinos); // Muestra los destinos cargados en consola
        this.destinos = destinos; // Asigna los destinos cargados a la variable de destinos
      },
      (error) => {
        console.error('Error al cargar destinos:', error); // Muestra error en caso de fallo al cargar los destinos
      }
    );
  }

  // Metodo que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.crearForm.invalid) {
      // Si el formulario es inválido, muestra una alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Complete todos los campos correctamente.',
      });
      return;
    }

    const experiencia = this.crearForm.value; // Obtiene los valores del formulario
    experiencia.destinoId = experiencia.destinos.id; // Extrae el ID del destino seleccionado
    delete experiencia.destinos; // Elimina el campo de destino ya que solo necesitamos el ID

    // Envía la experiencia al servidor para ser guardada
    this.experienciaService.guardarExperiencia(experiencia).subscribe(
      response => {
        // Muestra una alerta de éxito si la experiencia se guarda correctamente
        Swal.fire({
          icon: 'success',
          title: 'Experiencia guardada con éxito',
        }).then(() => {
          this.crearForm.reset(); // Resetea el formulario después de guardar la experiencia
        });
      },
      error => {
        // Manejo de errores en caso de que falle la petición
        if (error.status === 401) {
          // Si el error es 401 (No autenticado), muestra un mensaje de autenticación
          Swal.fire({
            icon: 'error',
            title: 'No estás autenticado',
            text: 'Por favor, inicia sesión nuevamente.',
          });
        } else {
          // Si ocurre cualquier otro error, muestra un mensaje genérico
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar la experiencia.',
          });
        }
      }
    );
  }

  // Metodo para limpiar el formulario
  limpiarFormulario() {
    this.crearForm.reset(); // Resetea todos los campos del formulario
  }

  // Metodo para volver a la página anterior
  volver() {
    this.router.navigate(['/tu-inicio']); // Navega de vuelta a la ruta principal
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {AlojamientoService} from "../alojamiento.service";
import {Router} from "@angular/router";
import {catchError, of} from "rxjs";
import Swal from "sweetalert2";

// Interfaz para representar un destino
interface Destinos {
  id: number; // Identificador único del destino
  destinoName: string; // Nombre del destino
}

// Interfaz para representar el tipo de alojamiento
interface TipoAlojamiento {
  id: number; // Identificador único del tipo de alojamiento
  nombre: string; // Nombre del tipo de alojamiento
}

// Interfaz para representar una imagen
interface Images {
  id: number; // Identificador único de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta donde se encuentra la imagen
  activa: boolean; // Indica si la imagen está activa
}

// Interfaz para representar un alojamiento
interface Alojamiento {
  id: number; // Identificador único del alojamiento
  descripcion: string; // Descripción del alojamiento
  destinos: Destinos[]; // Array de destinos asociados al alojamiento
  nombre: string; // Nombre del alojamiento
  tipoAlojamiento: TipoAlojamiento; // Tipo de alojamiento asociado
  direccion: string; // Dirección del alojamiento
  celular: string; // Número de celular de contacto
  email: string; // Correo electrónico de contacto
  webUrl: string; // URL del sitio web del alojamiento
  precioGeneral: number; // Precio general del alojamiento
  fechaCreacion: Date; // Fecha de creación del alojamiento
  imagenes: Images[]; // Array de imágenes asociadas al alojamiento
}

@Component({
  providers: [AlojamientoService, HttpClient], // Servicios utilizados en el componente
  selector: 'app-nuevo-alojamiento', // Selector del componente
  standalone: true, // Indica que el componente es autónomo
  imports: [
    HttpClientModule, // Módulo para hacer peticiones HTTP
    FormsModule, // Módulo para manejar formularios
    NgIf, // Directiva para condiciones en el HTML
    ReactiveFormsModule, // Módulo para formularios reactivos
    NgForOf, // Directiva para iterar sobre colecciones en el HTML
  ],
  templateUrl: './nuevo-alojamiento.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./nuevo-alojamiento.component.css'] // Ruta al archivo de estilos CSS
})
export class NuevoAlojamientoComponent implements OnInit {
  isSubmitting: boolean = false; // Indica si se está enviando el formulario
  crearForm!: FormGroup; // Grupo de formularios para manejar los datos del nuevo alojamiento
  alojamientos!: Alojamiento; // Objeto para almacenar los datos del alojamiento
  tipoAlojamientos: TipoAlojamiento[] = []; // Array para almacenar los tipos de alojamiento
  destinos: Destinos[] = []; // Array para almacenar los destinos
  imagenes: Images[] = []; // Array para almacenar las imágenes

  constructor(
    private formBuilder: FormBuilder, // Constructor del formulario reactivo
    //public dialogRef: MatDialogRef<NuevoAlojamientoComponent>, // Referencia al diálogo (opcional)
    //@Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados en el diálogo (opcional)
    private alojamientoService: AlojamientoService, // Servicio para manejar alojamientos
    private router: Router, // Servicio para manejar la navegación
  ) {}

  ngOnInit(): void {
    // Inicializa el componente
    this.crearForm = this.formBuilder.group({
      // Define el grupo de formularios con sus respectivos validadores
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      descripcion: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(250)]],
      tipoAlojamiento: ['', [Validators.required]],
      destinos: [[], [Validators.required]], // Inicializa como array vacío
      direccion: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      email: ['', [Validators.required]],
      webUrl: ['', [Validators.required]],
      precioGeneral: ['', [Validators.required]],
      fechaCreacion: ['', [Validators.required]], // Campo para la fecha de creación
      imagenes: [[], [Validators.required]], // Inicializa como array vacío
    });
    // Llama a métodos para cargar datos necesarios
    this.cargarTiposAlojamientos();
    this.cargarDestinos();
    this.cargarImages();
  }

  // Método para cargar las imágenes desde el servicio
  cargarImages(): void {
    this.alojamientoService.recuperarTodosImages().subscribe(
      (imagenes: Images[]) => {
        this.imagenes = imagenes; // Asigna las imágenes cargadas al array
        console.log('Imágenes cargadas:', this.imagenes); // Log para verificar las imágenes cargadas
      },
      (error) => {
        console.error('Error al cargar imágenes:', error); // Manejo de errores en la carga de imágenes
      }
    );
  }

  // Método para cargar los tipos de alojamiento desde el servicio
  cargarTiposAlojamientos(): void {
    this.alojamientoService.recuperarTodosTiposAlojamiento().subscribe(
      (tipos: TipoAlojamiento[]) => {
        this.tipoAlojamientos = tipos; // Asigna los tipos de alojamiento cargados al array
      },
      (error) => {
        console.error('Error al cargar el tipo de alojamiento', error); // Manejo de errores en la carga de tipos de alojamiento
      }
    );
  }

  // Método para cargar los destinos desde el servicio
  cargarDestinos(): void {
    this.alojamientoService.recuperarTodosDestinos().subscribe(
      (destinos: Destinos[]) => {
        this.destinos = destinos; // Asigna los destinos cargados al array
      },
      (error) => {
        console.error(error); // Manejo de errores en la carga de destinos
      }
    );
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.crearForm.valid) { // Verifica si el formulario es válido
      const nombre = this.crearForm.get('nombre')?.value; // Obtiene el valor del campo nombre
      const descripcion = this.crearForm.get('descripcion')?.value; // Obtiene el valor del campo descripción
      const direccion = this.crearForm.get('direccion')?.value; // Obtiene el valor del campo dirección
      const celular = this.crearForm.get('celular')?.value; // Obtiene el valor del campo celular
      const email = this.crearForm.get('email')?.value; // Obtiene el valor del campo email
      const webUrl = this.crearForm.get('webUrl')?.value; // Obtiene el valor del campo URL del sitio web
      const precioGeneral = this.crearForm.get('precioGeneral')?.value; // Obtiene el valor del campo precio general
      const fechaCreacion = this.crearForm.get('fechaCreacion')?.value; // Obtiene el valor del campo fecha de creación
      const destinos = this.crearForm.get('destinos')?.value; // Obtiene el valor del campo destinos
      const tipoAlojamiento = this.crearForm.get('tipoAlojamiento')?.value; // Obtiene el valor del campo tipo de alojamiento
      const images = this.crearForm.get('imagenes')?.value; // Obtiene el valor del campo imágenes

      // Log para verificar los datos a enviar al backend
      console.log('Datos a enviar al backend:');
      console.log('nombre:', nombre);
      console.log('descripcion:', descripcion);
      console.log('direccion:', direccion);
      console.log('celular:', celular);
      console.log('email:', email);
      console.log('webUrl:', webUrl);
      console.log('precioGeneral:', precioGeneral);
      console.log('fechaCreacion:', fechaCreacion);
      console.log('destinos:', destinos);
      console.log('tipoAlojamiento:', tipoAlojamiento);
      console.log('imagenes:', images);

      // Crea un objeto de alojamiento con los datos del formulario
      const alojamientoData: Alojamiento = {
        id: 0, // Asigna 0 como ID inicial (se generará en el backend)
        nombre: nombre,
        descripcion: descripcion,
        direccion: direccion,
        celular: celular,
        email: email,
        webUrl: webUrl,
        precioGeneral: precioGeneral,
        fechaCreacion: fechaCreacion,
        destinos: destinos,
        tipoAlojamiento: tipoAlojamiento,
        imagenes: images,
      };

      console.log('Datos a enviar al servicio:', alojamientoData); // Log para verificar los datos antes de enviar al servicio

      this.isSubmitting = true; // Indica que se está enviando el formulario

      this.alojamientoService.verificarAlojamientoExistente(nombre).pipe(
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      ).subscribe({
        next: (isExistente) => {
          if (isExistente) {
            Swal.fire({
              icon: 'error',
              title: 'El Alojamiento ya existe',
              text: 'Ingrese un nombre diferente'
            });
          } else {
            this.guardarAlojamiento(alojamientoData);
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al verificar el Alojamiento',
            text: error.message
          });
          this.isSubmitting = false;
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, complete todos los campos requeridos'
      });
    }
  }

  guardarAlojamiento(alojamientoData: Alojamiento): void {
    console.log('Enviando datos al servicio:', alojamientoData);

    this.alojamientoService.guardarAlojamiento(alojamientoData).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        Swal.fire({
          icon: 'success',
          title: 'El Alojamiento fue creado correctamente',
          showConfirmButton: false,
          timer: 2500
        });
        this.crearForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al guardar el alojamiento:', error);
        this.isSubmitting = false;

        let errorMsg = 'Ocurrió un error al crear el Alojamiento';
        console.log('Error status:', error.status);
        console.log('Error message:', error.message);
        console.log('Error details:', error);

        if (error.status === 400) {
          errorMsg = error.error ? error.error : 'Error de validación en el servidor';
        } else if (error.status === 0) {
          errorMsg = 'Error de red: no se puede conectar al servidor';
        } else if (error.status === 500) {
          errorMsg = 'Error interno del servidor: por favor, inténtelo de nuevo más tarde';
        } else if (error.status === 401) {
          errorMsg = 'Error de autenticación: no autorizado para realizar esta acción';
        } else if (error.status === 403) {
          errorMsg = 'Error de autorización: no tiene permisos para realizar esta acción';
        } else if (error.status === 408) {
          errorMsg = 'Error de tiempo de espera: la solicitud ha tardado demasiado en procesarse';
        } else if (error.status === 422) {
          errorMsg = 'Error de validación: los datos proporcionados no son válidos';
        } else {
          errorMsg = 'Error al crear el Alojamiento';
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg
        });
      }
    });
  }

  limpiarFormulario() {
    this.crearForm.reset();
  }
  volver() {
    this.router.navigate(['/alojamientos']);
  }

  agregarNuevaImagen() {
    this.router.navigate(['/nueva-imagen']);
  }
}

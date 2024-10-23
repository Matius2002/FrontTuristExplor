import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ImagesService} from "../images.service";
import {catchError, of} from "rxjs";
import Swal from "sweetalert2";

// Definición de la interfaz Images que representa la estructura de una imagen
interface Images {
  id: number; // Identificador único de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta donde se encuentra la imagen
  activa: boolean; // Indica si la imagen está activa
}

// Decorador del componente que define su configuración
@Component({
  providers: [ImagesService, HttpClient], // Proveedores del servicio de imágenes y cliente HTTP
  selector: 'app-nueva-images', // Selector del componente
  standalone: true, // Indica que este es un componente independiente
  imports: [ // Importaciones necesarias para el componente
    FormsModule, // Módulo para formularios
    NgIf, // Directiva para condicionales
    ReactiveFormsModule, // Módulo para formularios reactivos
    HttpClientModule, // Módulo para realizar solicitudes HTTP
    NgForOf, // Directiva para iterar sobre colecciones
  ],
  templateUrl: './nueva-images.component.html', // Ruta de la plantilla HTML del componente
  styleUrls: ['./nueva-images.component.css'] // Ruta de los estilos CSS del componente
})
export class NuevaImagesComponent implements OnInit { // Clase del componente que implementa la interfaz OnInit
  @ViewChild('fileInput') fileInput!: ElementRef; // Referencia al input de archivo
  crearForm!: FormGroup; // Grupo de formulario para manejar la creación de imágenes
  imagenes!: Images; // Variable para almacenar los datos de la imagen
  selectedFiles: File[] = []; // Arreglo para almacenar los archivos seleccionados

  // Constructor del componente donde se inyectan los servicios necesarios
  constructor(
    private formBuilder: FormBuilder, // Servicio para construir formularios
    private imagesService: ImagesService, // Servicio para manejar imágenes
    private router: Router // Servicio para manejar la navegación
  ) {}

  // Metodo que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.crearForm = this.formBuilder.group({ // Inicializa el grupo de formulario
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]], // Control para el nombre de la imagen
      ruta: ['', [Validators.required]], // Control para la ruta de la imagen
      activa: ['true'] // Control para el estado activo de la imagen
    });
  }

  // Metodo que se ejecuta al cambiar el archivo en el input
  onFileChange(event: any): void {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    // Valida el tipo y tamaño del archivo
    if (file && this.validarTipoArchivo(file) && this.validarTamanoArchivo(file)) {
      this.selectedFiles = [file]; // Almacena el archivo seleccionado
      const fileName = this.crearForm.get('nombre')?.value + this.getFileExtension(file.name); // Genera el nombre del archivo
      this.crearForm.patchValue({ ruta: fileName }); // Actualiza la ruta en el formulario
    } else {
      this.fileInput.nativeElement.value = ''; // Limpia el campo de selección de archivo
      Swal.fire('Error', 'Formato de archivo no válido o tamaño excedido. Solo se permiten archivos JPG, PNG, GIF o BMP de hasta 500MB.', 'error'); // Muestra un mensaje de error
    }
  }

  // Metodo que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.crearForm.invalid) { // Verifica si el formulario es inválido
      return; // Sale del metodo si el formulario es inválido
    }

    const formData: FormData = new FormData(); // Crea un nuevo objeto FormData
    formData.append('archivo', this.selectedFiles[0], this.crearForm.get('nombre')?.value + this.getFileExtension(this.selectedFiles[0].name)); // Agrega el archivo al FormData
    formData.append('nombre', this.crearForm.get('nombre')?.value); // Agrega el nombre al FormData

    // Llama al servicio para guardar la imagen
    this.imagesService.guardarImagenes(formData).pipe(
      catchError(error => {
        Swal.fire('Error', 'No se pudo cargar la imagen. Intente de nuevo.', 'error'); // Manejo de errores
        return of(null); // Devuelve un observable vacío en caso de error
      })
    ).subscribe((response) => {
      if (response) {
        Swal.fire('Éxito', 'La imagen se ha cargado exitosamente.', 'success'); // Muestra mensaje de éxito
        this.limpiarFormulario(); // Limpia el formulario después de cargar la imagen exitosamente
      }
    });
  }

  // Metodo que obtiene la extensión del archivo
  getFileExtension(filename: string): string {
    return filename.substring(filename.lastIndexOf('.')); // Devuelve la extensión del archivo
  }

  // Metodo que limpia el formulario
  limpiarFormulario() {
    this.crearForm.reset(); // Resetea el formulario
    this.selectedFiles = []; // Limpia el arreglo de archivos seleccionados
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Limpia el campo de selección de archivo
    }
  }

  // Metodo que navega de regreso a la lista de imágenes
  volver() {
    this.router.navigate(['/images']); // Navega a la ruta de imágenes
  }

  // Metodo que elimina la foto seleccionada
  eliminarFoto(): void {
    this.selectedFiles = []; // Limpia el arreglo de archivos seleccionados
    this.crearForm.patchValue({ ruta: '' }); // Limpia la ruta en el formulario
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Limpia el campo de selección de archivo
    }
  }

  // Metodo que muestra la foto completa en una nueva ventana
  verFotoCompleta(): void {
    if (this.selectedFiles.length > 0) { // Verifica si hay archivos seleccionados
      const fileURL = URL.createObjectURL(this.selectedFiles[0]); // Crea una URL para el archivo
      window.open(fileURL, '_blank'); // Abre la foto en una nueva ventana
    }
  }

  // Metodo que descarga la foto seleccionada
  descargarFoto(): void {
    if (this.selectedFiles.length > 0) { // Verifica si hay archivos seleccionados
      const fileURL = URL.createObjectURL(this.selectedFiles[0]); // Crea una URL para el archivo
      const a = document.createElement('a'); // Crea un elemento <a> para la descarga
      a.href = fileURL; // Establece la URL del archivo como href del enlace
      a.download = this.selectedFiles[0].name; // Establece el nombre del archivo para la descarga
      a.click(); // Simula un clic en el enlace para iniciar la descarga
      URL.revokeObjectURL(fileURL); // Revoca la URL creada
    }
  }

  // Metodo que valida el tipo de archivo
  validarTipoArchivo(archivo: File): boolean {
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']; // Tipos de archivos permitidos
    return tiposPermitidos.includes(archivo.type); // Devuelve true si el tipo de archivo es permitido
  }

  // Metodo que valida el tamaño del archivo
  validarTamanoArchivo(archivo: File): boolean {
    const tamanioMaximo = 500 * 1024 * 1024; // 500MB en bytes
    return archivo.size <= tamanioMaximo; // Devuelve true si el tamaño del archivo está dentro del límite
  }
}

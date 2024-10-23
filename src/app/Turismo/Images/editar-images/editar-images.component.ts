import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ImagesService} from "../images.service";
import Swal from "sweetalert2";
import {catchError, of} from "rxjs";

// Definición de la interfaz Images para estructurar los datos de las imágenes
interface Images {
  id: number; // Identificador único de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta de la imagen
  activa: boolean; // Estado de activación de la imagen
}

@Component({
  // Proveedores del componente, incluyendo el servicio de imágenes y el cliente HTTP
  providers: [HttpClient, ImagesService],
  selector: 'app-editar-images', // Selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [
    ReactiveFormsModule, // Módulo para formularios reactivos
    NgIf, // Directiva NgIf
    HttpClientModule, // Módulo para realizar solicitudes HTTP
    MatDialogModule, // Módulo para diálogos de Angular Material
    NgForOf, // Directiva NgFor
  ],
  templateUrl: './editar-images.component.html', // Ruta del archivo de plantilla HTML
  styleUrls: ['./editar-images.component.css'] // Ruta del archivo de estilos CSS
})
export class EditarImagesComponent implements OnInit { // Clase del componente que implementa OnInit
  editarForm!: FormGroup; // FormGroup para gestionar el formulario
  imagenes!: Images; // Variable para almacenar los datos de la imagen
  @ViewChild('fileInput') fileInput!: ElementRef; // Referencia al input de archivos
  selectedFiles: File[] = []; // Array para almacenar los archivos seleccionados

  constructor(
    public dialogRef: MatDialogRef<EditarImagesComponent>, // Referencia al diálogo
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos inyectados en el diálogo
    private imagesService: ImagesService, // Servicio para gestionar imágenes
    private formBuilder: FormBuilder, // Constructor para crear formularios reactivos
  ) {
    this.imagenes = data.imagenes; // Asigna los datos de la imagen desde el diálogo
  }

  ngOnInit(): void { // Metodo que se ejecuta al inicializar el componente
    this.editarForm = this.formBuilder.group({ // Inicializa el formulario
      nombre: [this.imagenes.nombre, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]], // Campo para el nombre con validaciones
      ruta: [this.imagenes.ruta, [Validators.required]], // Campo para la ruta con validación
      activa: [this.imagenes.activa] // Campo para el estado activo
    });
  }

  onFileChange(event: any): void { // Metodo que se ejecuta cuando se selecciona un archivo
    this.selectedFiles = Array.from(event.target.files); // Convierte los archivos seleccionados en un array
    if (this.selectedFiles.length > 0) { // Verifica si se han seleccionado archivos
      const fileName = this.editarForm.get('nombre')?.value + this.getFileExtension(this.selectedFiles[0].name); // Obtiene el nombre del archivo
      this.editarForm.patchValue({ ruta: fileName }); // Actualiza el campo de ruta en el formulario
    }
  }

  onSubmit(): void { // Metodo que se ejecuta al enviar el formulario
    if (this.editarForm.invalid) { // Verifica si el formulario es válido
      return; // Sale del metodo si el formulario es inválido
    }

    const formData: FormData = new FormData(); // Crea un nuevo objeto FormData para enviar datos
    // Añade el archivo y otros datos al FormData
    formData.append('archivo', this.selectedFiles[0], this.editarForm.get('nombre')?.value + this.getFileExtension(this.selectedFiles[0].name));
    formData.append('nombre', this.editarForm.get('nombre')?.value);
    formData.append('activa', String(this.editarForm.get('activa')?.value));

    // Llama al servicio para actualizar la imagen y maneja el resultado
    this.imagesService.actualizarImages(this.imagenes.id, formData).pipe(
      catchError(error => { // Captura errores
        Swal.fire('Error', 'No se pudo actualizar la imagen. Intente de nuevo.', 'error'); // Muestra un mensaje de error
        return of(null); // Retorna un observable vacío en caso de error
      })
    ).subscribe((response) => { // Suscribe al resultado de la actualización
      if (response) { // Verifica si la respuesta es válida
        Swal.fire('Éxito', 'La imagen se ha actualizado exitosamente.', 'success'); // Muestra un mensaje de éxito
        this.dialogRef.close(true); // Cierra el diálogo con un valor verdadero
      }
    });
  }

  getFileExtension(filename: string): string { // Metodo para obtener la extensión del archivo
    return filename.substring(filename.lastIndexOf('.')); // Retorna la extensión del archivo
  }

  limpiarFormulario() { // Metodo para limpiar el formulario
    this.editarForm.reset(); // Resetea el formulario
    this.selectedFiles = []; // Limpia los archivos seleccionados
    if (this.fileInput) { // Verifica si hay un input de archivo
      this.fileInput.nativeElement.value = ''; // Limpia el input de archivo
    }
  }

  eliminarFoto(): void { // Metodo para eliminar la foto seleccionada
    this.selectedFiles = []; // Limpia los archivos seleccionados
    this.editarForm.patchValue({ ruta: null }); // Resetea el campo de ruta
    this.fileInput.nativeElement.value = ''; // Limpia el input de archivo
  }

  verFotoCompleta(): void { // Metodo para ver la foto completa
    if (this.selectedFiles.length > 0) { // Verifica si hay archivos seleccionados
      const fileURL = URL.createObjectURL(this.selectedFiles[0]); // Crea un URL para el archivo
      window.open(fileURL, '_blank'); // Abre el archivo en una nueva pestaña
    }
  }

  descargarFoto(): void { // Metodo para descargar la foto
    if (this.selectedFiles.length > 0) { // Verifica si hay archivos seleccionados
      const fileURL = URL.createObjectURL(this.selectedFiles[0]); // Crea un URL para el archivo
      const a = document.createElement('a'); // Crea un elemento <a> para la descarga
      a.href = fileURL; // Establece la URL del archivo
      a.download = this.selectedFiles[0].name; // Establece el nombre del archivo a descargar
      a.click(); // Simula un clic en el enlace para iniciar la descarga
      URL.revokeObjectURL(fileURL); // Revoca el URL creado para liberar memoria
    }
  }

  validarTipoArchivo(archivo: File): boolean { // Metodo para validar el tipo de archivo
    const tiposPermitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/bmp']; // Tipos de archivos permitidos
    return tiposPermitidos.includes(archivo.type); // Retorna verdadero si el tipo de archivo está permitido
  }

  validarTamanoArchivo(archivo: File): boolean { // Metodo para validar el tamaño del archivo
    const tamanioMaximo = 1000 * 1024 * 1024; // 1000MB en bytes
    return archivo.size <= tamanioMaximo; // Retorna verdadero si el tamaño del archivo es menor o igual al máximo permitido
  }

  onCancelar(): void { // Metodo para cancelar la acción y cerrar el diálogo
    this.dialogRef.close(); // Cierra el diálogo
  }

  onClearForm(): void { // Metodo para limpiar el formulario
    this.editarForm.reset(); // Resetea el formulario
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {RolesService} from "../roles.service";
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import Swal from "sweetalert2";

// Definición de la interfaz 'Rol', que estructura la información que tiene un rol
interface Rol {
  id: number;              // Identificador único del rol
  rolName: string;         // Nombre del rol
  rolDescripc: string;     // Descripción del rol
  rolFechaCreac: Date;     // Fecha de creación del rol
  rolFechaModic: Date;    // Fecha de la última modificación del rol
}

// Decorador del componente, donde se definen los detalles sobre el componente
@Component({
  providers: [RolesService],  // Se inyecta el servicio 'RolesService' para manejar los roles
  selector: 'app-editar-roles', // Selector para usar este componente en la plantilla HTML
  standalone: true,            // Marca el componente como stand-alone para que sea independiente
  imports: [
    ReactiveFormsModule,      // Importa el módulo para formularios reactivos
    NgIf,                     // Importa la directiva 'NgIf' para mostrar u ocultar elementos
    HttpClientModule,         // Importa el módulo para realizar solicitudes HTTP
    MatDialogModule,          // Importa el módulo para diálogos de Angular Material
    NgForOf,                  // Importa el módulo para mostrar listas usando 'ngFor'
  ],
  templateUrl: './editar-roles.component.html',  // Ruta al archivo de plantilla HTML
  styleUrl: './editar-roles.component.css'       // Ruta al archivo de estilos CSS
})
export class EditarRolesComponent implements OnInit {
  crearForm!: FormGroup;         // Definición del formulario reactivo para editar el rol
  roles!: Rol;                   // Variable para almacenar los datos del rol actual
  isSubmitting: boolean = false; // Indica si se está enviando el formulario

  // Constructor que inyecta las dependencias necesarias para el componente
  constructor(
    private formBuilder: FormBuilder,   // Se inyecta el 'FormBuilder' para crear el formulario
    public dialogRef: MatDialogRef<EditarRolesComponent>,  // Referencia al diálogo donde se edita el rol
    @Inject(MAT_DIALOG_DATA) public data: any,           // Datos inyectados desde el diálogo
    private rolesService: RolesService, // Servicio para manejar operaciones con roles
  ) {
    this.roles = data.roles; // Almacena el rol recibido en los datos del diálogo
  }

  // Metodo de inicialización que se ejecuta al cargar el componente
  ngOnInit(): void {
    // Inicializa el formulario reactivo con valores preexistentes para editar
    this.crearForm = this.formBuilder.group({
      rolName: [this.data.rol.rolName, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],  // Valida que el nombre sea requerido y tenga entre 5 y 50 caracteres
      rolDescripc: [this.data.rol.rolDescripc, [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],  // Valida que la descripción sea requerida y tenga entre 10 y 500 caracteres
      rolFechaCreac: [this.data.rol.rolFechaCreac, [Validators.required]],  // Valida que la fecha de creación sea requerida
      rolFechaModic: [this.data.rol.rolFechaModic, [Validators.required]],  // Valida que la fecha de modificación sea requerida
    });
  }

  // Metodo privado para formatear la fecha en formato 'YYYY-MM-DDTHH:MM'
  private formatDate(date: Date): string {
    return new Date(date).toISOString().slice(0, 16); // Convierte la fecha a formato ISO y la recorta para obtener solo la parte 'YYYY-MM-DDTHH:MM'
  }

  // Metodo privado para filtrar elementos seleccionados de un arreglo basado en un conjunto de IDs
  private findSelectedItems(array: any[], ids: number[]): any[] {
    return array.filter(item => ids.includes(item.id)); // Devuelve los elementos que coinciden con los IDs
  }

  // Metodo que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    if (this.crearForm.valid) {  // Verifica si el formulario es válido
      const rolActualizada = this.crearForm.value;  // Obtiene los valores del formulario

      // Llama al servicio para actualizar el rol en el backend
      this.rolesService.actualizarRol(this.roles.id, rolActualizada).subscribe(
        () => {
          this.dialogRef.close('success');  // Cierra el diálogo si la actualización fue exitosa
          Swal.fire('¡Actualizado!', 'El Rol se ha actualizado correctamente.', 'success');  // Muestra un mensaje de éxito
        },
        error => {
          console.error('Error al actualizar el Rol:', error);  // Muestra el error en consola
          Swal.fire('¡Error!', 'Hubo un error al actualizar el Rol.', 'error');  // Muestra un mensaje de error
        }
      );
    } else {
      this.crearForm.markAllAsTouched();  // Marca todos los campos como tocados para que se muestren los errores de validación
    }
  }

  // Metodo para cancelar la edición y cerrar el diálogo sin hacer cambios
  onCancelar(): void {
    this.dialogRef.close();  // Cierra el diálogo sin hacer nada
  }

  // Metodo para limpiar el formulario y resetear los valores
  onClearForm(): void {
    this.crearForm.reset();  // Resetea el formulario a sus valores iniciales
  }
}


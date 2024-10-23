import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

// Define la interfaz para los destinos.
interface Destinos {
  id: number;          // Identificador único del destino.
  destinoName: string; // Nombre del destino.
}

// Define la interfaz para el tipo de alojamiento.
interface TipoAlojamiento {
  id: number;          // Identificador único del tipo de alojamiento.
  nombre: string;      // Nombre del tipo de alojamiento.
}

// Define la interfaz para las imágenes.
interface Images {
  id: number;          // Identificador único de la imagen.
  nombre: string;      // Nombre de la imagen.
  ruta: string;        // Ruta donde se almacena la imagen.
  activa: boolean;     // Estado que indica si la imagen está activa.
}

// Define la interfaz principal para el alojamiento.
interface Alojamiento {
  id: number;                    // Identificador único del alojamiento.
  descripcion: string;           // Descripción del alojamiento.
  destinos: Destinos[];          // Lista de destinos asociados al alojamiento.
  nombre: string;                // Nombre del alojamiento.
  tipoAlojamiento: TipoAlojamiento; // Tipo de alojamiento.
  direccion: string;             // Dirección del alojamiento.
  celular: string;               // Número de teléfono del alojamiento.
  email: string;                 // Correo electrónico del alojamiento.
  webUrl: string;                // URL del sitio web del alojamiento.
  precioGeneral: number;         // Precio general del alojamiento.
  fechaCreacion: Date;           // Fecha de creación del alojamiento.
  imagenes: Images[];            // Lista de imágenes asociadas al alojamiento.
}

// Decorador que indica que la clase es un servicio y puede ser inyectado.
@Injectable({
  providedIn: 'root' // Hace que el servicio esté disponible en toda la aplicación.
})
export class AlojamientoService {
  // URL base de la API
  dynamicHost = entornos.dynamicHost; // Se obtiene el host dinámico de las configuraciones.
  private baseUrl: string = `http://${this.dynamicHost}/api`; // URL base de la API.

  constructor(private http: HttpClient) {
    // El HttpClient se inyecta para realizar las solicitudes HTTP.
  }

  // Función para guardar un nuevo Alojamiento.
  guardarAlojamiento(alojamiento: Alojamiento): Observable<Alojamiento> {
    return this.http.post<Alojamiento>(`${this.baseUrl}/alojamientos/guardarAlojamientos`, alojamiento) // Realiza una solicitud POST para guardar el alojamiento.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función para eliminar un Alojamiento.
  eliminarAlojamiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/alojamientos/${id}`) // Realiza una solicitud DELETE para eliminar el alojamiento por ID.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función para recuperar todos los Alojamientos.
  recuperarTodosAlojamiento(): Observable<Alojamiento[]> {
    return this.http.get<Alojamiento[]>(`${this.baseUrl}/alojamientos/obtenerTodosLosAlojamientos`) // Realiza una solicitud GET para obtener todos los alojamientos.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función para obtener un Alojamiento por ID.
  obtenerAlojamiento(id: number): Observable<Alojamiento> {
    return this.http.get<Alojamiento>(`${this.baseUrl}/alojamientos/recuperarPorId/${id}`) // Realiza una solicitud GET para recuperar un alojamiento específico por ID.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función para actualizar un Alojamiento.
  actualizarAlojamiento(id: number, tipoActualizada: Alojamiento): Observable<Alojamiento> {
    // Asegúrate de que el ID en el cuerpo de la solicitud sea igual al ID en la URL.
    tipoActualizada.id = id; // Asigna el ID al objeto que se actualizará.
    return this.http.put<Alojamiento>(`${this.baseUrl}/alojamientos/${id}`, tipoActualizada) // Realiza una solicitud PUT para actualizar el alojamiento.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función para verificar si un Alojamiento ya existe en la base de datos.
  verificarAlojamientoExistente(nombre: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/alojamientos/existe/${encodeURIComponent(nombre)}`) // Realiza una solicitud GET para verificar la existencia del alojamiento.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función para recuperar todos los tipos de alojamiento.
  recuperarTodosTiposAlojamiento(): Observable<TipoAlojamiento[]> {
    return this.http.get<TipoAlojamiento[]>(`${this.baseUrl}/tipoAlojamientos/obtenerTodosLosTiposAlojamientos`) // Realiza una solicitud GET para obtener todos los tipos de alojamiento.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función para recuperar todos los destinos.
  recuperarTodosDestinos(): Observable<Destinos[]> {
    return this.http.get<Destinos[]>(`${this.baseUrl}/destinos/obtenerTodosLosDestinos`) // Realiza una solicitud GET para obtener todos los destinos.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función para recuperar todas las imágenes.
  recuperarTodosImages(): Observable<Images[]> {
    return this.http.get<Images[]>(`${this.baseUrl}/images/obtenerTodosLosImages`) // Realiza una solicitud GET para obtener todas las imágenes.
      .pipe(
        catchError(this.handleError) // Maneja errores usando la función handleError.
      );
  }

  // Función privada para manejar errores de HTTP.
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Error desconocido'; // Mensaje de error por defecto.
    if (error.error instanceof ErrorEvent) {
      // Manejo de errores del lado del cliente.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Manejo de errores del lado del servidor.
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
    }
    console.error(errorMessage); // Imprime el mensaje de error en la consola.
    return throwError(errorMessage); // Lanza un error que puede ser manejado por el componente que llama a esta función.
  }
}

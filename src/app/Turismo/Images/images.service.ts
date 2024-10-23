import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

// Interfaz que define la estructura de una imagen
interface Images {
  id: number;         // Identificador único de la imagen
  nombre: string;     // Nombre de la imagen
  ruta: string;       // Ruta donde se encuentra almacenada la imagen
  activa: boolean;    // Estado que indica si la imagen está activa o no
}

// Decorador que indica que esta clase es un servicio y se puede inyectar en otros componentes o servicios
@Injectable({
  providedIn: 'root' // Proporciona el servicio en el nivel raíz de la aplicación
})
export class ImagesService {

  // URL BASE API
  dynamicHost = entornos.dynamicHost; // Host dinámico que puede cambiar según el entorno
  private baseUrl: string = `http://${this.dynamicHost}/api`; // URL base para las peticiones a la API

  // Constructor del servicio, inyecta HttpClient para realizar peticiones HTTP
  constructor(private http: HttpClient) {
  }

  // Función para guardar una nueva imagen
  guardarImagenes(archivo: FormData): Observable<Images> {
    return this.http.post<Images>(`${this.baseUrl}/images/cargar`, archivo, {
      reportProgress: true, // Permite reportar el progreso de la carga
      observe: 'events' // Observa los eventos de la petición
    }).pipe(
      catchError(this.handleError) // Maneja cualquier error que ocurra en la petición
    );
  }

  // Eliminar una imagen por su ID
  eliminarImages(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/images/${id}`)
      .pipe(
        catchError(this.handleError) // Maneja cualquier error que ocurra en la petición
      );
  }

  // Recuperar todas las imágenes
  recuperarTodosImages(): Observable<Images[]> {
    return this.http.get<Images[]>(`${this.baseUrl}/images/obtenerTodosLosImages`)
      .pipe(
        catchError(this.handleError) // Maneja cualquier error que ocurra en la petición
      );
  }

  // Obtener una imagen por su ID
  obtenerImages(id: number): Observable<Images> {
    return this.http.get<Images>(`${this.baseUrl}/images/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError) // Maneja cualquier error que ocurra en la petición
      );
  }

  // Actualizar una imagen existente
  actualizarImages(id: number, formData: FormData): Observable<Images> {
    return this.http.put<Images>(`${this.baseUrl}/images/${id}`, formData).pipe(
      catchError(this.handleError) // Maneja cualquier error que ocurra en la petición
    );
  }

  // Verificar si una imagen ya existe en la base de datos
  verificarImagesExistente(nombre: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/images/existe/${encodeURIComponent(nombre)}`)
      .pipe(
        catchError(this.handleError) // Maneja cualquier error que ocurra en la petición
      );
  }

  // Función para manejar errores de HTTP
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Error desconocido'; // Mensaje por defecto en caso de error
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
    }
    console.error(errorMessage); // Muestra el error en la consola
    return throwError(errorMessage); // Devuelve el mensaje de error
  }
}


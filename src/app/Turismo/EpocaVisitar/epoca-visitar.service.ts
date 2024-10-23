import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

// Interfaz que define la estructura de un objeto EpocaVisitar
interface EpocaVisitar {
  id: number; // Identificador único de la época de visita
  nombre: string; // Nombre de la época de visita
  descripcion: string; // Descripción de la época de visita
  clima: string; // Clima de la época de visita
}

// Decorador Injectable para que el servicio esté disponible en toda la aplicación
@Injectable({
  providedIn: 'root' // Proporciona el servicio a nivel raíz
})
export class EpocaVisitarService {

  // URL BASE API
  dynamicHost = entornos.dynamicHost; // Obtiene el host dinámico del entorno
  private baseUrl: string = `http://${this.dynamicHost}/api`;  // URL base para las peticiones a la API

  // Constructor del servicio que inyecta HttpClient
  constructor(private http: HttpClient) {}

  // Función para guardar un nuevo EpocaVisitar
  guardarEpocaVisitar(tipoAlojamiento: EpocaVisitar): Observable<EpocaVisitar> {
    return this.http.post<EpocaVisitar>(`${this.baseUrl}/epocaVisitars/guardarEpocaVisitar`, tipoAlojamiento)
      .pipe(
        catchError(this.handleError) // Maneja errores en la petición
      );
  }

  // Función para eliminar un EpocaVisitar
  eliminarEpocaVisitar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/epocaVisitars/${id}`)
      .pipe(
        catchError(this.handleError) // Maneja errores en la petición
      );
  }

  // Función para recuperar todos los EpocaVisitar
  recuperarTodosEpocaVisitar(): Observable<EpocaVisitar[]> {
    return this.http.get<EpocaVisitar[]>(`${this.baseUrl}/epocaVisitars/obtenerTodosLosEpocaVisitar`)
      .pipe(
        catchError(this.handleError) // Maneja errores en la petición
      );
  }

  // Función para obtener un EpocaVisitar por su ID
  obtenerEpocaVisitar(id: number): Observable<EpocaVisitar> {
    return this.http.get<EpocaVisitar>(`${this.baseUrl}/epocaVisitars/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError) // Maneja errores en la petición
      );
  }

  // Función para actualizar un EpocaVisitar
  actualizarEpocaVisitar(id: number, tipoActualizada: EpocaVisitar): Observable<EpocaVisitar> {
    // Asegúrate de que el ID en el cuerpo de la solicitud sea igual al ID en la URL
    tipoActualizada.id = id; // Asigna el ID al objeto actualizado
    return this.http.put<EpocaVisitar>(`${this.baseUrl}/epocaVisitars/${id}`, tipoActualizada)
      .pipe(
        catchError(this.handleError) // Maneja errores en la petición
      );
  }

  // Función para verificar si una EpocaVisitar ya existe en la base de datos
  verificarEpocaVisitarExistente(nombre: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/epocaVisitars/existe/${encodeURIComponent(nombre)}`)
      .pipe(
        catchError(this.handleError) // Maneja errores en la petición
      );
  }

  // Función para manejar errores de HTTP
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Error desconocido'; // Mensaje de error por defecto
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
    }
    console.error(errorMessage); // Imprime el error en la consola
    return throwError(errorMessage); // Lanza el error
  }
}

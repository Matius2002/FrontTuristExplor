import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

// Interfaz que define la estructura de un objeto de tipo Atraciones.
interface Atraciones {
  id: number; // Identificador único de la atracción.
  nombre: string; // Nombre de la atracción.
  descripcion: string; // Descripción de la atracción.
  horarioFuncionamiento: string; // Horario de funcionamiento de la atracción.
  horarioFin: string; // Horario de finalización de la atracción.
}

// Decorador Injectable que permite que el servicio sea inyectado en otros componentes o servicios.
@Injectable({
  providedIn: 'root' // Proporciona este servicio a nivel raíz de la aplicación.
})
export class AtracionesService {

  // URL BASE API
  dynamicHost = entornos.dynamicHost; // Obtiene el host dinámico de las variables de entorno.
  private baseUrl: string = `http://${this.dynamicHost}/api`;  // Url Base API

  // Constructor que inyecta el servicio HttpClient para realizar solicitudes HTTP.
  constructor(private http: HttpClient) { }

  // Función para guardar un nuevo Atraciones.
  guardarAtraciones(tipoAlojamiento: Atraciones): Observable<Atraciones> {
    return this.http.post<Atraciones>(`${this.baseUrl}/atracionesPrincipales/guardarAtracionPrincipal`, tipoAlojamiento)
      .pipe(
        catchError(this.handleError) // Maneja errores de la solicitud.
      );
  }

  // Función para eliminar una Atración por su ID.
  eliminarAtraciones(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/atracionesPrincipales/${id}`)
      .pipe(
        catchError(this.handleError) // Maneja errores de la solicitud.
      );
  }

  // Función para recuperar todas las Atraciones.
  recuperarTodosAtraciones(): Observable<Atraciones[]> {
    return this.http.get<Atraciones[]>(`${this.baseUrl}/atracionesPrincipales/obtenerTodosLasAtraciones`)
      .pipe(
        catchError(this.handleError) // Maneja errores de la solicitud.
      );
  }

  // Función para obtener una Atración por su ID.
  obtenerAtraciones(id: number): Observable<Atraciones> {
    return this.http.get<Atraciones>(`${this.baseUrl}/atracionesPrincipales/recuperarPorId/${id}`)
      .pipe(
        catchError(this.handleError) // Maneja errores de la solicitud.
      );
  }

  // Función para actualizar una Atración por su ID.
  actualizarAtraciones(id: number, tipoActualizada: Atraciones): Observable<Atraciones> {
    // Asegúrate de que el ID en el cuerpo de la solicitud sea igual al ID en la URL.
    tipoActualizada.id = id; // Asigna el ID proporcionado a la atracción actualizada.
    return this.http.put<Atraciones>(`${this.baseUrl}/atracionesPrincipales/${id}`, tipoActualizada)
      .pipe(
        catchError(this.handleError) // Maneja errores de la solicitud.
      );
  }

  // Función para verificar si una Atración ya existe en la base de datos.
  verificarAtracionesExistente(nombre: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/atracionesPrincipales/existe/${encodeURIComponent(nombre)}`)
      .pipe(
        catchError(this.handleError) // Maneja errores de la solicitud.
      );
  }

  // Función privada para manejar errores de HTTP.
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Error desconocido'; // Mensaje de error predeterminado.
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor.
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
    }
    console.error(errorMessage); // Muestra el error en la consola.
    return throwError(errorMessage); // Lanza el error para que lo maneje el suscriptor.
  }
}

import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

// Interfaz que define la estructura de un objeto Rol
interface Rol {
  id: number; // ID único del rol
  rolName: string; // Nombre del rol
  rolDescripc: string; // Descripción del rol
  rolFechaCreac: Date; // Fecha de creación del rol
  rolFechaModic: Date; // Fecha de última modificación del rol
}

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})
export class RolesService {

  // Se obtiene la URL base de la API desde una configuración dinámica
  dynamicHost = entornos.dynamicHost;

  // Definición de la URL base de la API
  private baseUrl: string = `http://${this.dynamicHost}/api`;

  constructor(private http: HttpClient) {}

  // Metodo para generar los headers, incluyendo un posible email del localStorage
  private getHeaders(): HttpHeaders {
    const email = localStorage.getItem('userEmail'); // Se obtiene el email del usuario desde localStorage
    return new HttpHeaders({ 'email': email || '' }); // Se incluyen los headers con el email si existe
  }

  // Función para guardar un nuevo rol
  guardarRol(rol: Rol): Observable<Rol> {
    // Se envía una solicitud POST para guardar el rol en la API
    return this.http.post<Rol>(`${this.baseUrl}/roles/guardarRoles`, rol, { headers: this.getHeaders() })
      .pipe(
        // Si hay un error, se captura y maneja en el metodo handleError
        catchError(this.handleError)
      );
  }

  // Función para eliminar un rol por ID
  eliminarRol(id: number): Observable<void> {
    // Se envía una solicitud DELETE para eliminar el rol con el ID proporcionado
    return this.http.delete<void>(`${this.baseUrl}/roles/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Función para recuperar todos los roles
  recuperarTodosRol(): Observable<Rol[]> {
    // Se envía una solicitud GET para obtener todos los roles
    return this.http.get<Rol[]>(`${this.baseUrl}/roles/obtenerTodosLasRoles`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Función para obtener un rol por ID
  obtenerRol(id: number): Observable<Rol> {
    // Se envía una solicitud GET para obtener un rol específico por ID
    return this.http.get<Rol>(`${this.baseUrl}/roles/recuperarPorId/${id}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Función para actualizar un rol existente
  actualizarRol(id: number, rolActualizada: Rol): Observable<Rol> {
    // Se actualiza el ID del rol para asegurar que se está actualizando el correcto
    rolActualizada.id = id;

    // Se envía una solicitud PUT para actualizar el rol
    return this.http.put<Rol>(`${this.baseUrl}/roles/${id}`, rolActualizada, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Función para verificar si un rol ya existe por nombre
  verificarRolExistente(rolName: string): Observable<boolean> {
    // Se envía una solicitud GET para verificar si el nombre del rol ya existe
    return this.http.get<boolean>(`${this.baseUrl}/roles/existe/${encodeURIComponent(rolName)}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Función para verificar si un usuario tiene el rol de administrador
  verificarRolAdmin(email: string): Observable<string> {
    // Se envía una solicitud GET para verificar si el usuario es administrador
    return this.http.get<string>(`${this.baseUrl}/check-admin-role/${encodeURIComponent(email)}`, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }

  // Metodo para manejar errores de las solicitudes HTTP
  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 403) {
      // Si el error es de acceso denegado, se muestra un mensaje específico
      console.error('Acceso prohibido. No tienes permiso para acceder a este recurso.');
      return throwError('Acceso prohibido. No tienes permiso para acceder a este recurso.');
    } else {
      // Para otros errores, se genera un mensaje personalizado
      let errorMessage = 'Error desconocido';
      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
      }
      console.error(errorMessage); // Se registra el error en la consola
      return throwError(errorMessage); // Se lanza el error para que el flujo lo maneje quien consuma el observable
    }
  }
}

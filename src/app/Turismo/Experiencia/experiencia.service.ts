import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

// Definición de la interfaz 'Usuario', que describe la estructura de un objeto de usuario.
interface Usuario {
  id: number;              // Identificador único del usuario
  nombreUsuario: string;   // Nombre del usuario
  email: string;           // Email del usuario
}

// Definición de la interfaz 'Destinos', que describe la estructura de un objeto de destino.
interface Destinos {
  id: number;              // Identificador único del destino
  destinoName: string;     // Nombre del destino
}

// Definición de la interfaz 'Experiencia', que describe la estructura de un objeto de experiencia.
interface Experiencia {
  id: number;              // Identificador único de la experiencia
  calificacion: string;    // Calificación asignada a la experiencia
  comentario: string;      // Comentario sobre la experiencia
  fecha: string;           // Fecha en la que se registró la experiencia
  usuario: Usuario;        // Objeto 'Usuario' que representa al autor de la experiencia
  destino: Destinos;       // Objeto 'Destinos' que representa el destino relacionado
}

// Servicio inyectable, disponible a nivel global en la aplicación.
@Injectable({
  providedIn: 'root'       // El servicio se proporciona a nivel de raíz.
})
export class ExperienciaService {
  // Variable para almacenar la URL base de la API, la cual se ajusta dinámicamente según el entorno.
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;  // URL base para las llamadas a la API.

  // Constructor que inyecta el cliente HTTP para hacer solicitudes.
  constructor(private http: HttpClient) {}

  // Metodo para guardar una nueva experiencia.
  guardarExperiencia(experiencia: any): Observable<any> {
    // Obtener el token de autenticación almacenado en sessionStorage.
    const token = sessionStorage.getItem('token');

    // Si no se encuentra el token, se lanza un error.
    if (!token) {
      return throwError('Token no disponible');  // Manejar la ausencia de token.
    }

    // Configuración de los encabezados para la solicitud HTTP, incluyendo el token de autenticación.
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Realizar la solicitud POST para guardar la experiencia.
    return this.http.post<any>(`${this.baseUrl}/experiencias/guardarExperiencia`, experiencia, { headers })
      .pipe(
        // Manejar errores en caso de que la solicitud falle.
        catchError(this.handleError)
      );
  }

  // Metodo para eliminar una experiencia por su ID.
  eliminarExperiencia(id: number): Observable<void> {
    // Realizar la solicitud DELETE para eliminar la experiencia.
    return this.http.delete<void>(`${this.baseUrl}/experiencias/${id}`)
      .pipe(
        // Manejar errores en caso de que la solicitud falle.
        catchError(this.handleError)
      );
  }

  // Metodo para recuperar todas las experiencias.
  recuperarTodosExperiencia(): Observable<Experiencia[]> {
    // Realizar la solicitud GET para obtener todas las experiencias.
    return this.http.get<Experiencia[]>(`${this.baseUrl}/experiencias/obtenerTodosLosExperiencia`)
      .pipe(
        // Manejar errores en caso de que la solicitud falle.
        catchError(this.handleError)
      );
  }

  // Metodo para recuperar una experiencia específica por su ID.
  obtenerExperiencia(id: number): Observable<Experiencia> {
    // Realizar la solicitud GET para obtener la experiencia por su ID.
    return this.http.get<Experiencia>(`${this.baseUrl}/experiencias/recuperarPorId/${id}`)
      .pipe(
        // Manejar errores en caso de que la solicitud falle.
        catchError(this.handleError)
      );
  }

  // Metodo para actualizar una experiencia existente.
  actualizarExperiencia(id: number, experienciaActualizada: Experiencia): Observable<Experiencia> {
    // Asegurar que el ID en el cuerpo de la solicitud sea igual al ID en la URL.
    experienciaActualizada.id = id;

    // Realizar la solicitud PUT para actualizar la experiencia.
    return this.http.put<Experiencia>(`${this.baseUrl}/experiencias/${id}`, experienciaActualizada)
      .pipe(
        // Manejar errores en caso de que la solicitud falle.
        catchError(this.handleError)
      );
  }

  // Metodo para recuperar todos los destinos disponibles.
  recuperarTodosDestinos(): Observable<Destinos[]> {
    // Realizar la solicitud GET para obtener todos los destinos.
    return this.http.get<Destinos[]>(`${this.baseUrl}/destinos/obtenerTodosLosDestinos`)
      .pipe(
        // Manejar errores en caso de que la solicitud falle.
        catchError(this.handleError)
      );
  }

  // Metodo privado para manejar errores de HTTP.
  private handleError(error: HttpErrorResponse): Observable<any> {
    // Mensaje de error por defecto.
    let errorMessage = 'Error desconocido';

    // Si el error fue del lado del cliente.
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Si el error fue del lado del servidor.
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
    }

    // Imprimir el mensaje de error en la consola.
    console.error(errorMessage);

    // Devolver el error como un observable.
    return throwError(errorMessage);
  }
}

import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";

// Interfaz que define la estructura de un Rol
interface Rol {
  id: number;       // ID único del rol
  rolName: string;  // Nombre del rol
}

// Interfaz que define la estructura de un Permiso
interface Permiso {
  id: number;       // ID único del permiso
  name: string;     // Nombre del permiso
}

@Injectable({
  providedIn: 'root'  // Proporciona el servicio a nivel de toda la aplicación
})
export class PermisosService {

  // Variable que almacena el host dinámico donde se aloja la API
  dynamicHost = entornos.dynamicHost;

  // URL base para las peticiones HTTP, se construye con el valor de dynamicHost
  private baseUrl: string = `http://${this.dynamicHost}/api`;

  // Inyección de dependencia del HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {
    // El constructor inyecta el servicio HttpClient para realizar solicitudes HTTP
  }

  // Metodo para crear un nuevo permiso (pendiente de implementar)
  // Aquí puedes agregar la lógica para crear un nuevo permiso
  // createPermiso(permiso: Permiso): Observable<Permiso> {
  //   return this.http.post<Permiso>(`${this.baseUrl}/permisos`, permiso)
  //     .pipe(catchError(this.handleError));  // Maneja errores en la creación
  // }

  // Metodo para recuperar todos los permisos
  // Aquí puedes agregar la lógica para obtener todos los permisos
  // getPermisos(): Observable<Permiso[]> {
  //   return this.http.get<Permiso[]>(`${this.baseUrl}/permisos`)
  //     .pipe(catchError(this.handleError));  // Maneja errores al obtener permisos
  // }

  // Metodo para eliminar un permiso por su ID
  // Aquí puedes agregar la lógica para eliminar un permiso
  // deletePermiso(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/permisos/${id}`)
  //     .pipe(catchError(this.handleError));  // Maneja errores al eliminar permiso
  // }

  // Metodo para obtener un permiso por su ID
  // Aquí puedes agregar la lógica para obtener un permiso específico
  // getPermisoById(id: number): Observable<Permiso> {
  //   return this.http.get<Permiso>(`${this.baseUrl}/permisos/${id}`)
  //     .pipe(catchError(this.handleError));  // Maneja errores al obtener permiso por ID
  // }

  // Metodo para actualizar un permiso
  // Aquí puedes agregar la lógica para actualizar un permiso
  // updatePermiso(id: number, permiso: Permiso): Observable<Permiso> {
  //   return this.http.put<Permiso>(`${this.baseUrl}/permisos/${id}`, permiso)
  //     .pipe(catchError(this.handleError));  // Maneja errores al actualizar el permiso
  // }

  // Metodo para recuperar todos los roles
  // Aquí puedes agregar la lógica para obtener todos los roles
  // getRoles(): Observable<Rol[]> {
  //   return this.http.get<Rol[]>(`${this.baseUrl}/roles`)
  //     .pipe(catchError(this.handleError));  // Maneja errores al obtener roles
  // }

  // Función privada para manejar errores HTTP
  // Este metodo se invoca cuando una petición HTTP falla, gestionando los errores de forma centralizada
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Error desconocido';  // Mensaje por defecto si no se identifica el tipo de error
    if (error.error instanceof ErrorEvent) {
      // Si el error ocurre en el lado del cliente (por ejemplo, problema de red)
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Si el error ocurre en el lado del servidor (por ejemplo, error 404 o 500)
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`;
    }
    console.error(errorMessage);  // Muestra el error en la consola para depuración
    return throwError(errorMessage);  // Devuelve el error al componente que llamó al servicio
  }
}


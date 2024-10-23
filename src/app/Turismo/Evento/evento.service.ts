import { Injectable } from '@angular/core';
import {entornos} from "../../Entorno/entornos";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

// Definición de la interfaz TipoTurismo
interface TipoTurismo {
  id: number; // Identificador único del tipo de turismo
  nombre: string; // Nombre del tipo de turismo
  descripcion: string; // Descripción del tipo de turismo
  popularidad: string; // Nivel de popularidad del tipo de turismo
}

// Definición de la interfaz Destinos
interface Destinos {
  id: number; // Identificador único del destino
  destinoName: string; // Nombre del destino
}

// Definición de la interfaz Images
interface Images {
  id: number; // Identificador único de la imagen
  nombre: string; // Nombre de la imagen
  ruta: string; // Ruta donde se encuentra la imagen
  activa: boolean; // Estado de la imagen (activa o no)
}

// Definición de la interfaz Evento
interface Evento {
  id: number; // Identificador único del evento
  destinos: Destinos[]; // Lista de destinos asociados al evento
  nombre: string; // Nombre del evento
  descripcion: string; // Descripción del evento
  fechaInicio: Date; // Fecha de inicio del evento
  fechaFin: Date; // Fecha de finalización del evento
  ubicacion: string; // Ubicación del evento
  costoEntrada: number; // Costo de entrada al evento
  images: Images[]; // Lista de imágenes asociadas al evento
  tipoTurismo: TipoTurismo; // Tipo de turismo asociado al evento
}

// Decorador Injectable para el servicio
@Injectable({
  providedIn: 'root' // Provee el servicio en toda la aplicación
})
export class EventoService {

  // URL BASE API
  dynamicHost = entornos.dynamicHost; // Obtiene el host dinámico de la configuración
  private baseUrl: string = `http://${this.dynamicHost}/api`;  // Url Base API

  constructor(private http: HttpClient) {
    // Constructor que inyecta el servicio HttpClient para realizar peticiones HTTP
  }

  // Función para guardar un nuevo Evento
  guardarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.baseUrl}/eventos/guardarEventos`, evento) // Realiza una petición POST para guardar el evento
      .pipe(
        catchError(this.handleError) // Maneja errores utilizando la función handleError
      );
  }

  // Función para eliminar un Evento
  eliminarEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/eventos/${id}`) // Realiza una petición DELETE para eliminar el evento por ID
      .pipe(
        catchError(this.handleError) // Maneja errores
      );
  }

  // Función para recuperar todos los Eventos
  recuperarTodosEvento(): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}/eventos/obtenerTodosLosEvento`) // Realiza una petición GET para obtener todos los eventos
      .pipe(
        catchError(this.handleError) // Maneja errores
      );
  }

  // Función para obtener un Evento específico
  obtenerEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/eventos/recuperarPorId/${id}`) // Realiza una petición GET para obtener un evento por ID
      .pipe(
        catchError(this.handleError) // Maneja errores
      );
  }

  // Función para actualizar un Evento
  actualizarEvento(id: number, tipoActualizada: Evento): Observable<Evento> {
    tipoActualizada.id = id; // Asegúrate de que el ID en el cuerpo de la solicitud sea igual al ID en la URL
    return this.http.put<Evento>(`${this.baseUrl}/eventos/${id}`, tipoActualizada) // Realiza una petición PUT para actualizar el evento
      .pipe(
        catchError(this.handleError) // Maneja errores
      );
  }

  // Función para verificar si un Evento ya existe en la base de datos
  verificarEventoExistente(nombre: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/eventos/existe/${encodeURIComponent(nombre)}`) // Realiza una petición GET para verificar la existencia del evento
      .pipe(
        catchError(this.handleError) // Maneja errores
      );
  }

  // Función para recuperar todas las imágenes
  recuperarImages(): Observable<Images[]> {
    return this.http.get<Images[]>(`${this.baseUrl}/images/obtenerTodosLosImages`) // Realiza una petición GET para obtener todas las imágenes
      .pipe(
        catchError(this.handleError) // Maneja errores
      );
  }

  // Función para recuperar todos los destinos
  recuperarDestinos(): Observable<Destinos[]> {
    return this.http.get<Destinos[]>(`${this.baseUrl}/destinos/obtenerTodosLosDestinos`) // Realiza una petición GET para obtener todos los destinos
      .pipe(
        catchError(this.handleError) // Maneja errores
      );
  }

  // Función para recuperar todos los tipos de turismo
  recuperarTipoTurismo(): Observable<TipoTurismo[]> {
    return this.http.get<TipoTurismo[]>(`${this.baseUrl}/tipoturismos/obtenerTodosLosTiposTurismos`) // Realiza una petición GET para obtener todos los tipos de turismo
      .pipe(
        catchError(this.handleError) // Maneja errores
      );
  }

  // Función para manejar errores de HTTP
  private handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage = 'Error desconocido'; // Mensaje de error por defecto
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`; // Mensaje de error del cliente
    } else {
      // Error del lado del servidor
      errorMessage = `Código de error: ${error.status}, mensaje: ${error.error.message}`; // Mensaje de error del servidor
    }
    console.error(errorMessage); // Log del mensaje de error en la consola
    return throwError(errorMessage); // Retorna el mensaje de error
  }
}

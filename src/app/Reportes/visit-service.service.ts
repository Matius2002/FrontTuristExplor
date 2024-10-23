import { Injectable } from '@angular/core';
import {entornos} from "../Entorno/entornos";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible en toda la aplicación
})
export class VisitService {
  // Define la variable dynamicHost obtenida de entornos
  dynamicHost = entornos.dynamicHost;

  // Define la URL base para las solicitudes al API de visitas
  private baseUrl: string = `http://${this.dynamicHost}/api/visitas`;

  // Constructor que inyecta HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  /**
   * Registra una nueva visita en el sistema.
   * @param visita Objeto que contiene la información de la visita a registrar
   * @returns Observable que representa la respuesta de la solicitud HTTP
   */
  registrarVisita(visita: any): Observable<any> {
    // Realiza una solicitud POST para registrar la visita
    return this.http.post(`${this.baseUrl}/registrar`, visita);
  }

  /**
   * Obtiene un reporte de visitas basado en el tipo de turismo.
   * @param tipoTurismo El tipo de turismo para el que se solicita el reporte
   * @returns Observable que representa la respuesta de la solicitud HTTP
   */
  obtenerReporte(tipoTurismo: string): Observable<any> {
    // Realiza una solicitud GET para obtener el reporte
    return this.http.get(`${this.baseUrl}/reporte/${tipoTurismo}`);
  }
}


import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {entornos} from "../Entorno/entornos";
import {Observable} from "rxjs";
import {UsuarioService} from "../Admin/Usuarios/usuario.service";

@Injectable({
  providedIn: 'root' // Indica que el servicio se proporciona en el nivel raíz
})
export class ReportService {
  dynamicHost = entornos.dynamicHost; // Obtiene el host dinámico desde las configuraciones de entornos
  private baseUrl: string = `http://${this.dynamicHost}/api`; // Define la URL base para las API

  // Constructor que inyecta HttpClient y UsuarioService
  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

  /**
   * Obtiene la URL del reporte según el tipo y el formato.
   * @param reportType El tipo de reporte (usuarios, visitas, comentarios)
   * @param format El formato del reporte (pdf, excel)
   * @returns Observable con el archivo en el formato solicitado
   */
  //***************************************************************//
  getReportUrl(reportType: string, format: string): Observable<any> {
    let endpoint = ''; // Inicializa la variable endpoint
    // Determina el endpoint basado en el tipo de reporte
    if (reportType === 'usuarios') {
      endpoint = `${this.baseUrl}/reportes/usuarios/${format}`;
    } else if (reportType === 'visitas') {
      endpoint = `${this.baseUrl}/reportes/visitas/${format}`;
    } else if (reportType === 'comentarios') {
      endpoint = `${this.baseUrl}/reportes/comentarios/${format}`;
    }
    // Realiza una solicitud GET al endpoint y espera una respuesta de tipo blob
    return this.http.get(endpoint, { responseType: 'blob' });
  }
  //***************************************************************//

  // Métodos para obtener reportes de visitas en PDF y Excel.

  /**
   * Descarga el reporte de visitas en formato PDF.
   * @returns Observable con el archivo PDF.
   */
  getVisitasPdf(): Observable<Blob> {
    const url = `${this.baseUrl}/reportes/visitas/pdf`; // Define la URL del reporte en PDF
    // Realiza una solicitud GET y espera un blob como respuesta
    return this.http.get(url, { responseType: 'blob' });
  }

  /**
   * Descarga el reporte de visitas en formato Excel.
   * @returns Observable con el archivo Excel.
   */
  getVisitasExcel(): Observable<Blob> {
    const url = `${this.baseUrl}/reportes/visitas/excel`; // Define la URL del reporte en Excel
    // Realiza una solicitud GET y espera un blob como respuesta
    return this.http.get(url, { responseType: 'blob' });
  }
}

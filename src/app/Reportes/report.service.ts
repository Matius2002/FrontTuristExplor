import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {entornos} from "../Entorno/entornos";
import {Observable} from "rxjs";
import {UsuarioService} from "../Admin/Usuarios/usuario.service";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api`;
  constructor(private http: HttpClient, private usuarioService: UsuarioService) { }
  /**
   * Obtiene la URL del reporte según el tipo y el formato.
   * @param reportType El tipo de reporte (usuarios, visitas, comentarios)
   * @param format El formato del reporte (pdf, excel)
   * @returns Observable con el archivo en el formato solicitado
   */
  //***************************************************************//
  getReportUrl(reportType: string, format: string): Observable<any> {
    let endpoint = '';
    if (reportType === 'usuarios') {
      endpoint = `${this.baseUrl}/reportes/usuarios/${format}`;
    } else if (reportType === 'visitas') {
      endpoint = `${this.baseUrl}/reportes/visitas/${format}`;
    } else if (reportType === 'comentarios') {
      endpoint = `${this.baseUrl}/reportes/comentarios/${format}`;
    }
    return this.http.get(endpoint, { responseType: 'blob' });
  }
  //***************************************************************//











  // REPORTE DE VISITAS EN PDF Y EXCEL.
  /**
   * Descarga el reporte de visitas en formato PDF.
   * @returns Observable con el archivo PDF.
   */
  getVisitasPdf(): Observable<Blob> {
    const url = `${this.baseUrl}/reportes/visitas/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

  /**
   * Descarga el reporte de visitas en formato Excel.
   * @returns Observable con el archivo Excel.
   */
  getVisitasExcel(): Observable<Blob> {
    const url = `${this.baseUrl}/reportes/visitas/excel`;
    return this.http.get(url, { responseType: 'blob' });
  }

}

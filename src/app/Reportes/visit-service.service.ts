import { Injectable } from '@angular/core';
import {entornos} from "../Entorno/entornos";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class VisitService {
  dynamicHost = entornos.dynamicHost;
  private baseUrl: string = `http://${this.dynamicHost}/api/visitas`;
  constructor(private http: HttpClient) {}
  registrarVisita(visita: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/registrar`, visita);
  }

  obtenerReporte(tipoTurismo: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/reporte/${tipoTurismo}`);
  }



}


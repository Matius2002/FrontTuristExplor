import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PermisosService} from "../permisos.service";

// Interfaces para definir las estructuras de datos de Rol y Permisos
interface Rol {
  id: number;
  rolName: string;
}

interface Permisos {
  id: number;
  name: string;
}

// Decorador Component para definir el componente PermisosComponent
@Component({
  providers: [HttpClient, PermisosService],  // Servicios inyectados: HttpClient y PermisosService
  selector: 'app-permisos',  // Selector del componente (en el HTML se utilizará como <app-permisos>)
  standalone: true,  // El componente es independiente y no depende de otros módulos
  imports: [],  // Aquí puedes incluir módulos adicionales si es necesario
  templateUrl: './permisos.component.html',  // Ruta al archivo de plantilla HTML del componente
  styleUrl: './permisos.component.css'  // Ruta al archivo de estilos CSS del componente
})
export class PermisosComponent implements OnInit {
  // El método ngOnInit es el ciclo de vida de Angular que se ejecuta cuando el componente es inicializado
  ngOnInit(): void {
    // Aquí se pueden realizar inicializaciones o llamadas a servicios
  }
}


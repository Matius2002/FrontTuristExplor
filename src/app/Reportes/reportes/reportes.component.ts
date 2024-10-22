import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {UsuarioService} from "../../Admin/Usuarios/usuario.service";
import {ReportService} from "../report.service";
import saveAs from 'file-saver';

// Interfaz que define la estructura de un Rol
interface Rol {
  id: number;                  // Identificador único del rol
  rolName: string;             // Nombre del rol
  rolDescripc: string;         // Descripción del rol
  rolFechaCreac: Date;        // Fecha de creación del rol
  rolFechaModic: Date;        // Fecha de modificación del rol
}

// Interfaz que define la estructura de un Usuario
interface Usuarios {
  id: number;                  // Identificador único del usuario
  nombreUsuario: string;       // Nombre del usuario
  email: string;               // Correo electrónico del usuario
  password: string;            // Contraseña del usuario
  fechaRegistro: Date;        // Fecha de registro del usuario
  rol: Rol;                    // Rol asociado al usuario
}

@Component({
  // Servicios proporcionados para el componente
  providers: [UsuarioService, ReportService],
  selector: 'app-reportes',   // Selector del componente
  standalone: true,           // Marca el componente como autónomo
  imports: [
    NgClass,                  // Importa NgClass para usar clases dinámicas
    HttpClientModule,        // Importa HttpClientModule para realizar solicitudes HTTP
  ],
  templateUrl: './reportes.component.html', // Archivo HTML del componente
  styleUrl: './reportes.component.css'      // Archivo CSS del componente
})
export class ReportesComponent implements OnInit {
  isModalVisible: boolean = false; // Estado de visibilidad del modal
  selectedReport: string = '';      // Tipo de reporte seleccionado

  // Constructor del componente
  constructor(
    private router: Router,        // Inyecta el router para navegación
    private reportService: ReportService, // Inyecta el servicio de reportes
  ) {}

  // Metodo que se llama al inicializar el componente
  ngOnInit(): void {}

  // Metodo para mostrar las opciones de descarga de reportes
  showDownloadOptions(reportType: string) {
    this.selectedReport = reportType; // Establece el tipo de reporte seleccionado
    this.isModalVisible = true;       // Muestra el modal
  }

  // Metodo para cerrar el modal
  closeModal() {
    this.isModalVisible = false; // Oculta el modal
  }

  // Metodo para descargar el reporte en el formato seleccionado
  downloadReport(reportType: string, format: string) {
    // Solicita la URL del reporte al servicio
    this.reportService.getReportUrl(reportType, format).subscribe(url => {
      // Establece la extensión correcta para el archivo
      const extension = format === 'pdf' ? 'pdf' : 'xlsx';
      const blob = new Blob([url], {
        type: extension === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const downloadUrl = window.URL.createObjectURL(blob); // Crea un URL para el Blob
      const a = document.createElement('a'); // Crea un elemento <a> para la descarga
      a.href = downloadUrl;
      a.download = `${reportType}.${extension}`; // Establece el nombre del archivo a descargar
      a.click(); // Simula el clic para descargar
      window.URL.revokeObjectURL(downloadUrl); // Libera el URL creado
      this.closeModal(); // Cierra el modal
    }, error => {
      console.error('Error al descargar el reporte:', error); // Muestra error en consola
      alert('Error al descargar el reporte. Por favor, intenta de nuevo.'); // Mensaje de error
    });
  }

  // Metodo para navegar a otra ruta
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Navega a la ruta proporcionada
  }

  //***************************************************************//

  // Metodo para descargar el reporte de visitas en formato PDF
  descargarVisitasPdf(): void {
    this.reportService.getVisitasPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      saveAs(blob, 'reporte_visitas.pdf'); // Usa la función saveAs para descargar el archivo
    }, error => {
      console.error('Error al descargar el reporte de visitas en PDF:', error); // Muestra error en consola
    });
  }

  // Metodo para descargar el reporte de visitas en formato Excel
  descargarVisitasExcel(): void {
    this.reportService.getVisitasExcel().subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'reporte_visitas.xlsx'); // Usa la función saveAs para descargar el archivo
    }, error => {
      console.error('Error al descargar el reporte de visitas en Excel:', error); // Muestra error en consola
    });
    //***************************************************************//
  }
}

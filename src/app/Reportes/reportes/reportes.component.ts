import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {Router} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {UsuarioService} from "../../Admin/Usuarios/usuario.service";
import {ReportService} from "../report.service";
import saveAs from 'file-saver';
interface  Rol {
  id: number;
  rolName: string;
  rolDescripc: string;
  rolFechaCreac: Date;
  rolFechaModic: Date;
}
interface Usuarios {
  id: number;
  nombreUsuario: string;
  email: string;
  password: string;
  fechaRegistro: Date;
  rol: Rol;
}
@Component({
  providers: [UsuarioService, ReportService],
  selector: 'app-reportes',
  standalone: true,
  imports: [
    NgClass,
    HttpClientModule,

  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit{
  isModalVisible: boolean = false;
  selectedReport: string = '';
  constructor(
    private router: Router,
    private reportService: ReportService,
  ) {}
  ngOnInit(): void {}
  showDownloadOptions(reportType: string) {
    this.selectedReport = reportType;
    this.isModalVisible = true;
  }
  closeModal() {
    this.isModalVisible = false;
  }
  downloadReport(reportType: string, format: string) {
    this.reportService.getReportUrl(reportType, format).subscribe(url => {
      // Establece la extensión correcta para Excel
      const extension = format === 'pdf' ? 'pdf' : 'xlsx';
      const blob = new Blob([url], { type: extension === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${reportType}.${extension}`; // Usa la extensión correcta
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      this.closeModal();
    }, error => {
      console.error('Error al descargar el reporte:', error);
      alert('Error al descargar el reporte. Por favor, intenta de nuevo.');
    });
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }




  //***************************************************************//
  descargarVisitasPdf(): void {
    this.reportService.getVisitasPdf().subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' });
      saveAs(blob, 'reporte_visitas.pdf');
    }, error => {
      console.error('Error al descargar el reporte de visitas en PDF:', error);
    });
  }

  descargarVisitasExcel(): void {
    this.reportService.getVisitasExcel().subscribe(response => {
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'reporte_visitas.xlsx');
    }, error => {
      console.error('Error al descargar el reporte de visitas en Excel:', error);
    });
    //***************************************************************//
  }
}

import {Component, OnInit} from '@angular/core';
import {FilterPipe} from "../../../FilterPipe";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule, DecimalPipe, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {TooltipDirective} from "../../../../tooltip.directive";
import {NgxPaginationModule} from "ngx-pagination";
import {AtracionesService} from "../atraciones.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {EditarAtracionesComponent} from "../editar-atraciones/editar-atraciones.component";
import * as ExcelJS from "exceljs";

// Definición de la interfaz Atraciones
interface Atraciones {
  id: number; // Identificador único de la atracción
  nombre: string; // Nombre de la atracción
  descripcion: string; // Descripción de la atracción
  horarioFuncionamiento: string; // Horario de funcionamiento de la atracción
  horarioFin: string; // Horario de cierre de la atracción
}

// Definición de la interfaz Item
interface Item {
  id: number; // Identificador único del ítem
  nombre: string; // Nombre del ítem
}

@Component({
  providers: [AtracionesService, HttpClient], // Servicios proporcionados en este componente
  selector: 'app-atraciones-principal', // Selector del componente
  standalone: true, // Indica que este componente puede funcionar por sí mismo
  imports: [
    FilterPipe, // Pipe para filtrar datos
    HttpClientModule, // Módulo para realizar solicitudes HTTP
    NgIf, // Directiva para mostrar/ocultar elementos
    DecimalPipe, // Pipe para formatear números decimales
    CommonModule, // Módulo común de Angular
    MatInputModule, // Módulo de Angular Material para inputs
    MatFormFieldModule, // Módulo de Angular Material para campos de formulario
    MatCell, // Clase para celdas de tablas de Angular Material
    MatCellDef, // Clase para definir celdas de tablas de Angular Material
    FormsModule, // Módulo para formularios en Angular
    TooltipDirective, // Directiva para mostrar tooltips
    NgxPaginationModule, // Módulo para paginación
    FilterPipe, // Pipe para filtrar datos
  ],
  templateUrl: './atraciones-principal.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./atraciones-principal.component.css'] // Ruta de los estilos CSS
})
export class AtracionesPrincipalComponent implements OnInit { // Clase del componente
  isHelpModalVisible: boolean = false; // Indica si el modal de ayuda está visible
  atraciones: Atraciones[] = []; // Array para almacenar las atracciones
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc'; // Orden de clasificación

  // Propiedades para manejo de eliminación
  showAlert: boolean = false; // Indica si se debe mostrar una alerta
  atracionesToDelete: Atraciones | null = null; // Atracción seleccionada para eliminar
  atracionesEliminado: boolean = false; // Indica si la atracción ha sido eliminada
  errorMessage: string | null = null; // Mensaje de error, si ocurre

  // Propiedades para búsqueda
  searchText: string = ''; // Texto de búsqueda
  items: Item[] = []; // Array para almacenar los ítems
  filteredItems: Item[] = []; // Ítems filtrados según búsqueda
  displayedItems: Item[] = []; // Ítems que se mostrarán
  searchNotFound: boolean = false; // Indica si no se encontraron resultados

  constructor(
    private atracionesService: AtracionesService, // Servicio para manejar atracciones
    private dialog: MatDialog, // Servicio para manejar diálogos
    private router: Router, // Servicio para la navegación
  ) { }

  ngOnInit(): void {
    this.cargarAtraciones(); // Carga las atracciones al inicializar el componente
  }

  // Metodo para imprimir la tabla de atracciones
  printTable() {
    window.print(); // Imprime la ventana actual
  }

  // Metodo para abrir el modal de actualización de una atracción
  openUpdateModal(atraccion: Atraciones): void {
    const dialogRef = this.dialog.open(EditarAtracionesComponent, {
      width: '400px', // Ancho del modal
      data: { atraciones: atraccion } // Datos pasados al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      // Manejo del resultado al cerrar el modal
      if (result === 'success') {
        Swal.fire('¡Actualizado!', 'La Atracción se ha actualizado correctamente.', 'success');
      } else if (result === 'error') {
        Swal.fire('Error', 'Ha ocurrido un error al actualizar la Atracción.', 'error');
      }
    });
  }

  protected readonly Math = Math; // Proporciona acceso a la clase Math

  // Metodo para cargar las atracciones desde el servicio
  cargarAtraciones() {
    this.atracionesService.recuperarTodosAtraciones().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        console.log("Cantidad de registros recibidos:", data.length);
        // Mapea los datos recibidos a la estructura de Atraciones
        this.atraciones = data.map(atraccion => {
          return {
            id: atraccion.id,
            nombre: atraccion.nombre,
            descripcion: atraccion.descripcion,
            horarioFuncionamiento: atraccion.horarioFuncionamiento,
            horarioFin: atraccion.horarioFin,
          };
        });
        // Calcula el número total de páginas
        this.totalPages = Math.ceil(this.atraciones.length / this.itemsPerPage);
        console.log("Datos de los tipos de Alojamiento cargados correctamente:", this.atraciones);
      },
      error => {
        console.error('Error al cargar los tipos de Alojamiento:', error); // Manejo de errores
      }
    );
  }

  // Metodo para exportar las atracciones a un archivo Excel
  exportToExcel() {
    const workbook = new ExcelJS.Workbook(); // Crea un nuevo libro de trabajo
    const worksheet = workbook.addWorksheet('TipoAlojamiento'); // Agrega una nueva hoja
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 }, // Columna ID
      { header: 'Nombre', key: 'nombre', width: 30 }, // Columna Nombre
      { header: 'Descripción', key: 'descripcion', width: 15 }, // Columna Descripción
      { header: 'horario Funcionamiento', key: 'horarioFuncionamiento', width: 15 }, // Columna Horario de Funcionamiento
      { header: 'horario Fin', key: 'horarioFin', width: 15 }, // Columna Horario de Fin
    ];
    // Agrega cada atracción a la hoja
    this.atraciones.forEach(atraccion => {
      worksheet.addRow(atraccion);
    });
    // Escribe el buffer de Excel y crea un blob para descargar
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob); // Crea un objeto URL para el blob
      window.open(url); // Abre la URL en una nueva pestaña
    });
  }

  // Metodo para ordenar las columnas de la tabla
  sortColumn(columnName: string) {
    if (this.currentColumn === columnName) {
      // Cambia el orden si se vuelve a hacer clic en la misma columna
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      // Cambia a la nueva columna y establece el orden ascendente
      this.currentColumn = columnName;
      this.sortOrder = 'asc';
    }
    this.sortData(); // Ordena los datos según la configuración
  }

  sortData() {
    if (this.currentColumn) {
      this.atraciones.sort((a, b) => {
        const aValue = a.id;
        const bValue = b.id;
        if (aValue < bValue) {
          return this.sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return this.sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }
  //Metodo para Eliminar
  onEliminarAtraccion(atraccion: Atraciones) {
    this.atracionesToDelete = atraccion;
    this.confirmDelete();
  }
  confirmDelete() {
    if (this.atracionesToDelete) {
      const tipoId = this.atracionesToDelete.id;
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.showAlert = false;
          this.atracionesService.eliminarAtraciones(tipoId).subscribe(() => {
            this.atraciones = this.atraciones.filter(p => p.id !== tipoId);
            this.atracionesToDelete = null;
            this.atracionesEliminado = true; // Mostrar mensaje de eliminación correcta
            setTimeout(() => {
              this.atracionesEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
            }, 3000);
            Swal.fire('¡Eliminado!', 'La Atracción ha sido eliminado correctamente.', 'success');
          }, error => {
            console.error('Error al eliminar La Atracción :', error);
            this.errorMessage = 'Hubo un error al eliminar La Atracción . Por favor, inténtalo de nuevo más tarde.';
            setTimeout(() => {
              this.showAlert = false;
            }, 8000);
            Swal.fire('Error', 'Hubo un error al eliminar La Atracción .', 'error');
          });
        }
      });
    }
  }
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { nombre: string; }) => {
        const itemText = item.nombre.toLowerCase();
        return searchKeywords.every(keyword => itemText.includes(keyword));
      });
      this.searchNotFound = this.filteredItems.length === 0;
      this.updateTable();
    } else {
      this.displayedItems = [];
      this.searchNotFound = false;
    }
  }
  updateTable() {
    this.displayedItems = this.filteredItems;
  }
  highlightMatches(content: string, keyword: string): string {
    if (!keyword.trim()) return content;
    const regex = new RegExp(keyword, 'gi');
    return content.replace(regex, match => `<span class="highlight">${match}</span>`);
  }

  onNuevaAtraccion() {
    this.router.navigate(['/nueva-atracciones']);
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  toggleHelpModal() {
    this.isHelpModalVisible = !this.isHelpModalVisible;
  }
}

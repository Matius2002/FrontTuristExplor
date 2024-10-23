import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AlojamientoService} from "../alojamiento.service";
import {FilterPipe} from "../../../FilterPipe";
import {CommonModule, DecimalPipe, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {TooltipDirective} from "../../../../tooltip.directive";
import {NgxPaginationModule} from "ngx-pagination";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import * as ExcelJS from "exceljs";
import {EditarAlojamientoComponent} from "../editar-alojamiento/editar-alojamiento.component";

// Interfaz para los destinos
interface Destinos {
  id: number;
  destinoName: string;
}

// Interfaz para el tipo de alojamiento
interface TipoAlojamiento {
  id: number;
  nombre: string;
}

// Interfaz para las imágenes
interface Images {
  id: number;
  nombre: string;
  ruta: string;
  activa: boolean;
}

// Interfaz para el alojamiento
interface Alojamiento {
  id: number;
  descripcion: string;
  destinos: Destinos[];
  nombre: string;
  tipoAlojamiento: TipoAlojamiento;
  direccion: string;
  celular: string;
  email: string;
  webUrl: string;
  precioGeneral: number;
  fechaCreacion: Date;
  imagenes: Images[];
}

// Interfaz para los elementos en la búsqueda
interface Item {
  id: number;
  nombre: string;
}

// Decorador de componente
@Component({
  providers: [HttpClient, AlojamientoService],
  selector: 'app-alojamiento',
  standalone: true,
  imports: [
    FilterPipe,
    HttpClientModule,
    NgIf,
    DecimalPipe,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCell,
    MatCellDef,
    FormsModule,
    TooltipDirective,
    NgxPaginationModule,
  ],
  templateUrl: './alojamiento.component.html',
  styleUrl: './alojamiento.component.css'
})
export class AlojamientoComponent implements OnInit {
  isHelpModalVisible: boolean = false; // Estado para controlar la visibilidad del modal de ayuda
  alojamientos: Alojamiento[] = []; // Lista de alojamientos cargados
  page = 1; // Inicializa la página en 1
  itemsPerPage = 5; // Número de elementos por página
  totalPages = 0; // Número total de páginas
  currentColumn: string = 'id'; // Columna inicial para ordenar
  sortOrder: string = 'asc'; // Orden ascendente inicialmente

  // Variables para eliminar alojamiento
  showAlert: boolean = false;
  alojamientoToDelete: Alojamiento | null = null;
  alojamientoEliminado: boolean = false;
  errorMessage: string | null = null;

  // Variables para la búsqueda
  searchText: string = '';
  items: Item[] = [];
  filteredItems: Item[] = [];
  displayedItems: Item[] = [];
  searchNotFound: boolean = false;

  constructor(
    private alojamientoService: AlojamientoService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.cargarAlojamiento(); // Cargar los alojamientos al iniciar
  }

  // Metodo para imprimir la tabla
  printTable() {
    window.print();
  }

  // Abrir modal para actualizar alojamiento
  openUpdateModal(alojamientos: Alojamiento): void {
    const dialogRef = this.dialog.open(EditarAlojamientoComponent, {
      width: '400px',
      data: { alojamientos }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        Swal.fire('¡Actualizado!', 'El Alojamiento se ha actualizado correctamente.', 'success');
      } else if (result === 'error') {
        Swal.fire('Error', 'Ha ocurrido un error al actualizar El Alojamiento.', 'error');
      }
    });
  }

  protected readonly Math = Math;

  // Cargar la lista de alojamientos desde el servicio
  cargarAlojamiento() {
    this.alojamientoService.recuperarTodosAlojamiento().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        console.log("Cantidad de registros recibidos:", data.length);
        this.alojamientos = data.map(alojamiento => {
          return {
            id: alojamiento.id,
            nombre: alojamiento.nombre,
            descripcion: alojamiento.descripcion,
            destinos: alojamiento.destinos,
            tipoAlojamiento: alojamiento.tipoAlojamiento,
            direccion: alojamiento.direccion,
            celular: alojamiento.celular,
            email: alojamiento.email,
            webUrl: alojamiento.webUrl,
            precioGeneral: alojamiento.precioGeneral,
            fechaCreacion: alojamiento.fechaCreacion,
            imagenes: alojamiento.imagenes
          };
        });
        this.totalPages = Math.ceil(this.alojamientos.length / this.itemsPerPage);
        console.log("Datos de los Alojamientos cargados correctamente:", this.alojamientos);
      },
      error => {
        console.error('Error al cargar los Alojamientos:', error);
      }
    );
  }

  // Exportar la lista de alojamientos a un archivo Excel
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('TipoTurismo');
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Destinos', key: 'destinos', width: 15 },
      { header: 'Tipo de Alojamiento', key: 'tipoAlojamiento', width: 15 },
      { header: 'Direccion', key: 'direccion', width: 20 },
      { header: 'Celular', key: 'celular', width: 20 },
      { header: 'Email', key: 'email', width: 20 },
      { header: 'WebUrl', key: 'webUrl', width: 20 },
      { header: 'Precio General', key: 'precioGeneral', width: 20 },
      { header: 'Fecha Actualizacion', key: 'fechaActualizacion', width: 20 },
      { header: 'Fecha Creacion', key: 'fechaCreacion', width: 20 },
    ];
    this.alojamientos.forEach(alojamiento => {
      worksheet.addRow(alojamiento);
    });
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  // Ordenar columna
  sortColumn(columnName: string) {
    if (this.currentColumn === columnName) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentColumn = columnName;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }

  // Metodo para ordenar los datos
  sortData() {
    if (this.currentColumn) {
      this.alojamientos.sort((a, b) => {
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

  // Metodo para eliminar alojamiento
  onEliminarAlojamiento(alojamiento: Alojamiento) {
    this.alojamientoToDelete = alojamiento;
    this.confirmDelete();
  }

  // Confirmar eliminación con SweetAlert
  confirmDelete() {
    if (this.alojamientoToDelete) {
      const tipoId = this.alojamientoToDelete.id;
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
          this.alojamientoService.eliminarAlojamiento(tipoId).subscribe(() => {
            this.alojamientos = this.alojamientos.filter(p => p.id !== tipoId);
            this.alojamientoToDelete = null;
            this.alojamientoEliminado = true; // Mostrar mensaje de eliminación correcta
            setTimeout(() => {
              this.alojamientoEliminado = false; // Ocultar el mensaje después de cierto tiempo (por ejemplo, 3 segundos)
            }, 3000);
            Swal.fire('¡Eliminado!', 'El Alojamiento ha sido eliminado correctamente.', 'success');
          }, error => {
            console.error('Error al eliminar El Alojamiento:', error);
            this.errorMessage = 'Hubo un error al eliminar El Alojamiento. Por favor, inténtalo de nuevo más tarde.';
            setTimeout(() => {
              this.showAlert = false;
            }, 8000);
            Swal.fire('Error', 'Hubo un error al eliminar El Alojamiento.', 'error');
          });
        }
      });
    }
  }

  // Realizar búsqueda
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
      this.displayedItems = this.items;
      this.searchNotFound = false;
    }
  }

  // Actualizar tabla
  updateTable() {
    const startIndex = (this.page - 1) * this.itemsPerPage;
    this.displayedItems = this.filteredItems.slice(startIndex, startIndex + this.itemsPerPage);
  }

  // Metodo para resaltar las coincidencias de búsqueda en el contenido
  highlightMatches(content: string, keyword: string): string {
    if (!keyword.trim()) return content; // Si no hay palabra clave, devuelve el contenido original
    const regex = new RegExp(keyword, 'gi'); // Crea una expresión regular para encontrar coincidencias, sin distinción de mayúsculas/minúsculas
    return content.replace(regex, match => `<span class="highlight">${match}</span>`); // Reemplaza las coincidencias por un <span> con clase "highlight"
  }

// Metodo para navegar a la página de creación de un nuevo tipo de alojamiento
  onNuevoTipo() {
    this.router.navigate(['/nuevo-alojamiento']); // Redirige a la ruta '/nuevo-alojamiento'
  }

// Metodo genérico para navegar a cualquier ruta
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]); // Redirige a la ruta proporcionada
  }

// Metodo para mostrar u ocultar el modal de ayuda
  toggleHelpModal() {
    this.isHelpModalVisible = !this.isHelpModalVisible; // Alterna el estado de visibilidad del modal de ayuda
  }
}

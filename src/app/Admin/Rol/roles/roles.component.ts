import {Component, OnInit} from '@angular/core';
import {RolesService} from "../roles.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule, DecimalPipe, NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCell, MatCellDef} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {TooltipDirective} from "../../../../tooltip.directive";
import {NgxPaginationModule} from "ngx-pagination";
import {FilterPipe} from "../../../FilterPipe";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import * as ExcelJS from "exceljs";
import {EditarRolesComponent} from "../editar-roles/editar-roles.component";

// Definición de la interfaz Rol
interface Rol {
  id: number;               // ID del rol
  rolName: string;          // Nombre del rol
  rolDescripc: string;      // Descripción del rol
  rolFechaCreac: Date;      // Fecha de creación del rol
  rolFechaModic: Date;      // Fecha de modificación del rol
}

// Definición de la interfaz Item (usada para la búsqueda y filtrado)
interface Item {
  id: number;               // ID del ítem
  rolName: string;          // Nombre del rol en el ítem
}

// Definición del componente Angular
@Component({
  providers: [RolesService, HttpClient],  // Proveedores del servicio RolesService y HttpClient
  selector: 'app-roles',                  // Selector del componente
  standalone: true,                       // Componente independiente
  imports: [                              // Módulos que se importan en el componente
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
    FilterPipe,
  ],
  templateUrl: './roles.component.html',   // Ruta del archivo HTML del componente
  styleUrl: './roles.component.css'        // Ruta del archivo CSS del componente
})
export class RolesComponent implements OnInit {
  isHelpModalVisible: boolean = false;     // Control de visibilidad del modal de ayuda
  roles: Rol[] = [];                       // Arreglo para almacenar los roles
  page = 1;                                // Página inicial (para paginación)
  itemsPerPage = 5;                        // Número de elementos por página
  totalPages = 0;                          // Total de páginas para la paginación
  currentColumn: string = 'id';            // Columna actual para ordenar
  sortOrder: string = 'asc';               // Orden de clasificación (ascendente o descendente)

  // Variables para la funcionalidad de eliminar
  showAlert: boolean = false;              // Controla la visibilidad de la alerta
  rolToDelete: Rol | null = null;          // Rol que será eliminado
  rolEliminado: boolean = false;           // Indicador de rol eliminado
  errorMessage: string | null = null;      // Mensaje de error al eliminar

  // Variables para búsqueda y filtrado
  searchText: string = '';                 // Texto de búsqueda ingresado por el usuario
  items: Item[] = [];                      // Arreglo con los ítems de búsqueda
  filteredItems: Item[] = [];              // Arreglo con los ítems filtrados por búsqueda
  displayedItems: Item[] = [];             // Ítems que se mostrarán en la tabla
  searchNotFound: boolean = false;         // Indicador si no se encuentran resultados en la búsqueda

  constructor(
    private rolesService: RolesService,    // Servicio para manejar roles
    private dialog: MatDialog,             // Servicio para abrir diálogos/modales
    private router: Router,                // Servicio para navegación
  ) {}

  // Metodo del ciclo de vida de Angular, se llama cuando se inicializa el componente
  ngOnInit(): void {
    this.cargarRoles();                    // Carga los roles cuando el componente se inicializa
  }

  // Metodo para imprimir la tabla
  printTable() {
    window.print();
  }

  // Abre un modal para actualizar la información de un rol
  openUpdateModal(rol: Rol): void {
    const dialogRef = this.dialog.open(EditarRolesComponent, {
      width: '400px',
      data: { rol }                        // Pasa los datos del rol al componente de edición
    });

    // Después de cerrar el modal, verifica si la actualización fue exitosa o falló
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        Swal.fire('¡Actualizado!', 'El Rol se ha actualizado correctamente.', 'success');
      } else if (result === 'error') {
        Swal.fire('Error', 'Ha ocurrido un error al actualizar El Rol.', 'error');
      }
    });
  }

  // Metodo para cargar los roles desde el servicio RolesService
  cargarRoles() {
    this.rolesService.recuperarTodosRol().subscribe(
      data => {
        // Mapeo de los datos recibidos
        this.roles = data.map(rol => ({
          id: rol.id,
          rolName: rol.rolName,
          rolDescripc: rol.rolDescripc,
          rolFechaCreac: rol.rolFechaCreac,
          rolFechaModic: rol.rolFechaModic,
        }));
        this.totalPages = Math.ceil(this.roles.length / this.itemsPerPage);  // Calcula el número total de páginas
      },
      error => {
        console.error('Error al cargar los Roles:', error);  // Muestra el error si ocurre
      }
    );
  }

  // Exporta los roles a un archivo de Excel
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();     // Crea un nuevo archivo Excel
    const worksheet = workbook.addWorksheet('Roles');  // Añade una hoja al archivo
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Rol Name', key: 'rolName', width: 30 },
      { header: 'Rol Descripc', key: 'rolDescripc', width: 15 },
      { header: 'Rol FechaCreac', key: 'rolFechaCreac', width: 15 },
      { header: 'Rol FechaModic', key: 'rolFechaModic', width: 15 },
    ];

    // Añade las filas de los roles al archivo Excel
    this.roles.forEach(rol => {
      worksheet.addRow(rol);
    });

    // Genera y descarga el archivo
    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  // Metodo para ordenar las columnas de la tabla
  sortColumn(columnName: string) {
    if (this.currentColumn === columnName) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Alterna el orden si la columna ya está seleccionada
    } else {
      this.currentColumn = columnName;
      this.sortOrder = 'asc'; // Orden ascendente por defecto para una nueva columna
    }
    this.sortData();
  }

  // Ordena los datos según la columna y el orden especificado
  sortData() {
    if (this.currentColumn) {
      this.roles.sort((a, b) => {
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

  // Metodo para eliminar un rol
  onEliminarRol(rol: Rol) {
    this.rolToDelete = rol;       // Establece el rol que se va a eliminar
    this.confirmDelete();         // Llama al metodo para confirmar la eliminación
  }

  // Muestra un diálogo de confirmación para eliminar el rol
  confirmDelete() {
    if (this.rolToDelete) {
      const tipoId = this.rolToDelete.id;
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
          this.rolesService.eliminarRol(tipoId).subscribe(() => {
            this.roles = this.roles.filter(p => p.id !== tipoId);  // Filtra los roles y elimina el seleccionado
            this.rolToDelete = null;                               // Resetea el rol a eliminar
            Swal.fire('¡Eliminado!', 'El Rol ha sido eliminado correctamente.', 'success');
          }, error => {
            console.error('Error al eliminar El Rol:', error);
            Swal.fire('Error', 'Hubo un error al eliminar El Rol.', 'error');
          });
        }
      });
    }
  }

  // Realiza la búsqueda filtrando los ítems según el texto ingresado
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter((item: { rolName: string }) => {
        const itemText = item.rolName.toLowerCase();
        return searchKeywords.every(keyword => itemText.includes(keyword));
      });
      this.searchNotFound = this.filteredItems.length === 0;
      this.updateTable();  // Actualiza la tabla con los resultados filtrados
    } else {
      this.displayedItems = [];
      this.searchNotFound = false;
    }
  }

  // Actualiza la tabla con los ítems filtrados
  updateTable() {
    this.displayedItems = this.filteredItems.slice(0, 5);  // Muestra los primeros 5 elementos filtrados
  }

  highlightMatches(content: string, keyword: string): string {
    if (!keyword.trim()) return content;
    const regex = new RegExp(keyword, 'gi');
    return content.replace(regex, match => `<span class="highlight">${match}</span>`);
  }

  onNuevoRol() {
    this.router.navigate(['/nuevo-rol']);
  }

  navigateToo(route: string) {
    this.router.navigate([`/${route}`]);

  }

  toggleHelpModal() {
    this.isHelpModalVisible = !this.isHelpModalVisible;
  }
}

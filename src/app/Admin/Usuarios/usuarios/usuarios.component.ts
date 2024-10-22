import {Component, OnInit} from '@angular/core';
import {UsuarioService} from "../usuario.service";
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
import {EditarUsuariosComponent} from "../editar-usuarios/editar-usuarios.component";

// Interfaz para definir el modelo de Rol
interface Rol {
  id: number;
  rolName: string;
  rolDescripc: string;
  rolFechaCreac: Date;
  rolFechaModic: Date;
}

// Interfaz para definir el modelo de Usuario, que incluye un rol
interface Usuarios {
  id: number;
  nombreUsuario: string;
  email: string;
  password: string;
  fechaRegistro: Date;
  rol: Rol;
}

// Interfaz para manejar un Item simplificado que se usa en las búsquedas
interface Item {
  id: number;
  nombreUsuario: string;
}

// Decorador @Component para definir el metadato del componente
@Component({
  providers: [UsuarioService, HttpClient], // Proveedores necesarios para los servicios
  selector: 'app-usuarios', // Selector HTML del componente
  standalone: true, // Componente independiente
  imports: [ // Módulos importados
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
    NgxPaginationModule, // Módulo para paginación
    FilterPipe, // Filtro de búsqueda
  ],
  templateUrl: './usuarios.component.html', // Ruta del archivo HTML
  styleUrl: './usuarios.component.css' // Ruta del archivo CSS
})
export class UsuariosComponent implements OnInit {
  // Variables para control de la modal de ayuda y la lista de usuarios
  isHelpModalVisible: boolean = false;
  usuarios: Usuarios[] = [];

  // Variables para la paginación
  page = 1; // Página inicial
  itemsPerPage = 5; // Elementos por página
  totalPages = 0; // Número total de páginas

  // Variables para el ordenamiento
  currentColumn: string = 'id'; // Columna por defecto para ordenar
  sortOrder: string = 'asc'; // Orden ascendente por defecto

  // Variables para el manejo de la eliminación
  showAlert: boolean = false;
  usuariosToDelete: Usuarios | null = null;
  usuariosEliminado: boolean = false;
  errorMessage: string | null = null;

  // Variables para la búsqueda
  searchText: string = '';
  items: Item[] = [];
  filteredItems: Item[] = [];
  displayedItems: Item[] = [];
  searchNotFound: boolean = false;

  // Constructor que inyecta los servicios necesarios
  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.cargarUsuarios(); // Cargar usuarios al inicio
  }

  // Función para imprimir la tabla de usuarios
  printTable() {
    window.print();
  }

  // Función para abrir el modal de actualización de usuarios
  openUpdateModal(usuario: Usuarios): void {
    const dialogRef = this.dialog.open(EditarUsuariosComponent, {
      width: '400px',
      data: { usuario } // Pasa el usuario seleccionado como dato
    });

    // Escucha el cierre del modal y maneja el resultado
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'success') {
        Swal.fire('¡Actualizado!', 'El Usuario se ha actualizado correctamente.', 'success');
      } else if (result === 'error') {
        Swal.fire('Error', 'Ha ocurrido un error al actualizar El Usuario.', 'error');
      }
    });
  }

  // Función para cargar los usuarios desde el servicio
  cargarUsuarios() {
    this.usuarioService.recuperarTodosUsuario().subscribe(
      data => {
        console.log("Datos recibidos del servidor:", data);
        this.usuarios = data.map(usuario => ({
          id: usuario.id,
          nombreUsuario: usuario.nombreUsuario,
          email: usuario.email,
          password: usuario.password,
          fechaRegistro: usuario.fechaRegistro,
          rol: usuario.rol
        }));
        this.totalPages = Math.ceil(this.usuarios.length / this.itemsPerPage);
        console.log("Usuarios cargados:", this.usuarios);
      },
      error => {
        console.error('Error al cargar los Usuarios:', error);
      }
    );
  }

  // Función para exportar los usuarios a un archivo Excel
  exportToExcel() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre Usuario', key: 'nombreUsuario', width: 30 },
      { header: 'Email', key: 'email', width: 15 },
      { header: 'Password', key: 'password', width: 15 },
      { header: 'Fecha Registro', key: 'fechaRegistro', width: 15 },
      { header: 'Rol', key: 'rol', width: 15 },
    ];

    this.usuarios.forEach(usuario => {
      worksheet.addRow(usuario);
    });

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  // Función para ordenar columnas de la tabla
  sortColumn(columnName: string) {
    if (this.currentColumn === columnName) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentColumn = columnName;
      this.sortOrder = 'asc';
    }
    this.sortData();
  }

  // Función para ordenar los datos según la columna y orden actual
  sortData() {
    if (this.currentColumn) {
      this.usuarios.sort((a, b) => {
        const aValue = a.id;
        const bValue = b.id;
        return this.sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      });
    }
  }

  // Función para confirmar la eliminación de un usuario
  onEliminarUsuario(usuario: Usuarios) {
    this.usuariosToDelete = usuario;
    this.confirmDelete();
  }

  // Función para mostrar el cuadro de diálogo de confirmación de eliminación
  confirmDelete() {
    if (this.usuariosToDelete) {
      const tipoId = this.usuariosToDelete.id;
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
          this.usuarioService.eliminarUsuario(tipoId).subscribe(() => {
            this.usuarios = this.usuarios.filter(p => p.id !== tipoId);
            this.usuariosToDelete = null;
            this.usuariosEliminado = true; // Mostrar mensaje de éxito
            setTimeout(() => this.usuariosEliminado = false, 3000);
            Swal.fire('¡Eliminado!', 'El Usuario ha sido eliminado.', 'success');
          }, error => {
            console.error('Error al eliminar El Usuario:', error);
            this.errorMessage = 'Hubo un error al eliminar El Usuario. Por favor, inténtalo de nuevo más tarde.';
            setTimeout(() => this.showAlert = false, 8000);
            Swal.fire('Error', 'Hubo un error al eliminar El Usuario.', 'error');
          });
        }
      });
    }
  }

  // Función para realizar la búsqueda de usuarios
  performSearch() {
    if (this.searchText.trim() !== '') {
      const searchKeywords = this.searchText.toLowerCase().split(' ').filter(Boolean);
      this.filteredItems = this.items.filter(item =>
        searchKeywords.every(keyword => item.nombreUsuario.toLowerCase().includes(keyword))
      );
      this.searchNotFound = this.filteredItems.length === 0;
      this.updateTable();
    } else {
      this.displayedItems = [];
      this.searchNotFound = false;
    }
  }

  // Función para actualizar la tabla de usuarios filtrados
  updateTable() {
    this.displayedItems = this.filteredItems;
  }

  // Función para resaltar coincidencias en la búsqueda
  highlightMatches(content: string, keyword: string): string {
    if (!keyword.trim()) return content;
    const regex = new RegExp(keyword, 'gi');
    return content.replace(regex, match => `<span class="highlight">${match}</span>`);
  }

  // Función para redirigir a la página de creación de nuevos usuarios
  onNuevoUsers() {
    this.router.navigate(['/nuevo-usuario']);
  }

  // Función genérica de navegación
  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }

  // Función para mostrar u ocultar la modal de ayuda
  toggleHelpModal() {
    this.isHelpModalVisible = !this.isHelpModalVisible;
  }
}

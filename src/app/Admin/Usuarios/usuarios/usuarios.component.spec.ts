import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosComponent } from './usuarios.component';

// Descripción del conjunto de pruebas para el componente 'UsuariosComponent'
describe('UsuariosComponent', () => {
  let component: UsuariosComponent;  // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<UsuariosComponent>;  // Variable para manejar el fixture (entorno de pruebas)

  // Configuración que se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configuración del TestBed, incluyendo la creación y compilación del módulo de prueba
    await TestBed.configureTestingModule({
      imports: [UsuariosComponent]  // Importación del componente que será probado
    })
      .compileComponents();  // Compilación de los componentes necesarios

    // Creación del componente y almacenamiento de su instancia
    fixture = TestBed.createComponent(UsuariosComponent);
    component = fixture.componentInstance;  // Instancia del componente que será probado
    fixture.detectChanges();  // Detección de cambios inicial para el ciclo de vida del componente
  });

  // Prueba simple para verificar que el componente se ha creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();  // Comprueba que la instancia del componente existe
  });
});

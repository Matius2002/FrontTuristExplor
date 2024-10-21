import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarPermisosComponent } from './editar-permisos.component';

// Definición del bloque de pruebas para el componente "EditarPermisosComponent"
describe('EditarPermisosComponent', () => {
  // Se declaran las variables necesarias para la prueba del componente
  let component: EditarPermisosComponent;  // Variable que almacena el componente a probar
  let fixture: ComponentFixture<EditarPermisosComponent>;  // Variable que contiene la referencia a la instancia de la vista del componente

  // Configuración del entorno de pruebas antes de cada prueba individual
  beforeEach(async () => {
    // Configura el módulo de pruebas que incluirá el componente a testear
    await TestBed.configureTestingModule({
      imports: [EditarPermisosComponent]  // Importa el componente para la configuración del módulo de prueba
    })
      .compileComponents();  // Compila el componente

    // Crea una instancia del componente para las pruebas
    fixture = TestBed.createComponent(EditarPermisosComponent);  // Genera una instancia de la vista del componente
    component = fixture.componentInstance;  // Obtiene la instancia del componente
    fixture.detectChanges();  // Dispara la detección de cambios para aplicar las actualizaciones de Angular
  });

  // Test: Verifica si el componente se crea correctamente
  it('should create', () => {
    // Verifica si la instancia del componente fue creada correctamente
    expect(component).toBeTruthy();  // Comprueba que el componente no sea nulo o indefinido
  });
});


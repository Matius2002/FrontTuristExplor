import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosComponent } from './permisos.component';

// Define el conjunto de pruebas para el componente PermisosComponent
describe('PermisosComponent', () => {
  // Define las variables para el componente y el fixture que lo prueba
  let component: PermisosComponent;
  let fixture: ComponentFixture<PermisosComponent>;

  // Antes de cada prueba
  beforeEach(async () => {
    // Configura el entorno de pruebas de Angular TestBed
    await TestBed.configureTestingModule({
      // Importa el componente PermisosComponent para la prueba
      imports: [PermisosComponent]
    })
      .compileComponents();  // Compila los componentes

    // Crea una instancia del componente a probar
    fixture = TestBed.createComponent(PermisosComponent);
    // Obtiene la instancia del componente
    component = fixture.componentInstance;
    // Dispara la detección de cambios, asegurando que el componente se haya renderizado correctamente
    fixture.detectChanges();
  });

  // Test para verificar que el componente se crea correctamente
  it('should create', () => {
    // Comprobamos que la instancia del componente se ha creado correctamente
    expect(component).toBeTruthy();
  });
});


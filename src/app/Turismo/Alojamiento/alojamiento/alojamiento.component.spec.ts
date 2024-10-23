import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlojamientoComponent } from './alojamiento.component';

// Descripción del conjunto de pruebas para el componente AlojamientoComponent
describe('AlojamientoComponent', () => {
  // Declaración de las variables para el componente y el fixture
  let component: AlojamientoComponent;
  let fixture: ComponentFixture<AlojamientoComponent>;

  // Antes de cada prueba, se ejecuta este bloque
  beforeEach(async () => {
    // Configuración del entorno de pruebas con el módulo del componente
    await TestBed.configureTestingModule({
      // Importación del componente que será probado
      imports: [AlojamientoComponent]
    })
      // Compilación de los componentes para las pruebas
      .compileComponents();

    // Creación del fixture, que es un entorno de prueba que contiene el componente
    fixture = TestBed.createComponent(AlojamientoComponent);
    // Obtención de la instancia del componente desde el fixture
    component = fixture.componentInstance;
    // Detección de cambios para actualizar el estado del componente
    fixture.detectChanges();
  });

  // Prueba que verifica si el componente se creó correctamente
  it('should create', () => {
    // Comprobación de que la instancia del componente es válida (fue creada correctamente)
    expect(component).toBeTruthy();
  });
});

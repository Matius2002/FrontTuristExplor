import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';

// Descripción del conjunto de pruebas para el MapComponent
describe('MapComponent', () => {
  // Declaración de variables para el componente y su fixture
  let component: MapComponent; // Variable para la instancia del componente
  let fixture: ComponentFixture<MapComponent>; // Variable para la fixture del componente

  // Configuración previa a las pruebas
  beforeEach(async () => {
    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [MapComponent] // Importación del MapComponent para la prueba
    })
      .compileComponents(); // Compilación de los componentes declarados

    // Creación de la fixture del MapComponent
    fixture = TestBed.createComponent(MapComponent);
    // Obtención de la instancia del componente
    component = fixture.componentInstance;
    // Detección de cambios para inicializar el componente
    fixture.detectChanges();
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Afirmación de que el componente existe
  });
});


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpocaVisitarComponent } from './epoca-visitar.component';

// Descripción del conjunto de pruebas para el componente EpocaVisitarComponent
describe('EpocaVisitarComponent', () => {
  let component: EpocaVisitarComponent; // Declaración de la instancia del componente
  let fixture: ComponentFixture<EpocaVisitarComponent>; // Declaración del fixture del componente

  // Antes de cada prueba, configura el entorno de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpocaVisitarComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes del módulo

    // Crea una instancia del componente y del fixture
    fixture = TestBed.createComponent(EpocaVisitarComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente
    fixture.detectChanges(); // Detecta cambios en el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera
  });
});

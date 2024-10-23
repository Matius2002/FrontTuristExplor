import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaEpocaVisitarComponent } from './nueva-epoca-visitar.component';

describe('NuevaEpocaVisitarComponent', () => {
  let component: NuevaEpocaVisitarComponent; // Declaramos una variable para el componente
  let fixture: ComponentFixture<NuevaEpocaVisitarComponent>; // Declaramos una variable para el fixture del componente

  beforeEach(async () => {
    // Configuración del módulo de prueba antes de cada prueba
    await TestBed.configureTestingModule({
      imports: [NuevaEpocaVisitarComponent] // Importamos el componente que se está probando
    })
      .compileComponents(); // Compilamos los componentes
  });

  beforeEach(() => {
    // Creación del fixture y del componente antes de cada prueba
    fixture = TestBed.createComponent(NuevaEpocaVisitarComponent); // Creamos el fixture del componente
    component = fixture.componentInstance; // Obtenemos la instancia del componente
    fixture.detectChanges(); // Detectamos cambios en el fixture
  });

  it('should create', () => {
    // Test que verifica si el componente se ha creado correctamente
    expect(component).toBeTruthy(); // Esperamos que la instancia del componente sea verdadera (no nula)
  });
});

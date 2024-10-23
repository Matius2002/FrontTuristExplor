import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEpocaVisitarComponent } from './editar-epoca-visitar.component';

describe('EditarEpocaVisitarComponent', () => {
  // Declaración de la variable para el componente EditarEpocaVisitar
  let component: EditarEpocaVisitarComponent;
  // Declaración de la variable para el fixture del componente
  let fixture: ComponentFixture<EditarEpocaVisitarComponent>;

  // Configuración inicial antes de cada prueba
  beforeEach(async () => {
    // Configura el módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [EditarEpocaVisitarComponent] // Importa el componente a probar
    })
      .compileComponents(); // Compila los componentes

    // Crea una instancia del componente y del fixture
    fixture = TestBed.createComponent(EditarEpocaVisitarComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios para inicializar el componente
  });

  // Prueba para verificar si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera
  });
});

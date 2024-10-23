import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAtracionesComponent } from './editar-atraciones.component';

describe('EditarAtracionesComponent', () => {
  let component: EditarAtracionesComponent; // Declaración de la variable para el componente
  let fixture: ComponentFixture<EditarAtracionesComponent>; // Declaración de la variable para el fixture del componente

  // Configuración inicial del entorno de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAtracionesComponent] // Importación del componente a probar
    })
      .compileComponents(); // Compilación de los componentes

    // Creación de una instancia del componente y del fixture
    fixture = TestBed.createComponent(EditarAtracionesComponent);
    component = fixture.componentInstance; // Asignación de la instancia del componente
    fixture.detectChanges(); // Detección de cambios inicial
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verificación de que el componente sea verdadero (exista)
  });
});

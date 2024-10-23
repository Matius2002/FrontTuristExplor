import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEventoComponent } from './editar-evento.component';

// Descripción del bloque de pruebas para el componente EditarEventoComponent
describe('EditarEventoComponent', () => {
  let component: EditarEventoComponent; // Declaración de la variable que contendrá la instancia del componente
  let fixture: ComponentFixture<EditarEventoComponent>; // Declaración de la variable que contendrá la configuración de la prueba del componente

  // Función que se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configuración del módulo de prueba
    await TestBed.configureTestingModule({
      imports: [EditarEventoComponent] // Importa el componente a probar
    })
      .compileComponents(); // Compila los componentes y plantillas

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(EditarEventoComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios para inicializar la vista
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Afirmación para verificar que el componente fue creado
  });
});

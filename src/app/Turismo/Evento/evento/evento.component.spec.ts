import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoComponent } from './evento.component';

// Describe el conjunto de pruebas para el EventoComponent
describe('EventoComponent', () => {
  // Declara las variables para el componente y su fixture
  let component: EventoComponent;
  let fixture: ComponentFixture<EventoComponent>;

  // Antes de ejecutar las pruebas, configura el entorno de pruebas
  beforeEach(async () => {
    // Configura el módulo de pruebas para incluir el EventoComponent
    await TestBed.configureTestingModule({
      imports: [EventoComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes del módulo

    // Crea una instancia del componente y de su fixture
    fixture = TestBed.createComponent(EventoComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente
    fixture.detectChanges(); // Detecta los cambios para inicializar el componente
  });

  // Test para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente es verdadera (existe)
  });
});

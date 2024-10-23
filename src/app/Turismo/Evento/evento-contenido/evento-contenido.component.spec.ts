import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventoContenidoComponent } from './evento-contenido.component';

describe('EventoContenidoComponent', () => {
  // Definición de la variable del componente
  let component: EventoContenidoComponent;
  // Definición de la variable de la instancia del componente
  let fixture: ComponentFixture<EventoContenidoComponent>;

  // Función que se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configuración del módulo de prueba
    await TestBed.configureTestingModule({
      imports: [EventoContenidoComponent] // Importa el componente a probar
    })
      .compileComponents(); // Compila los componentes

    // Crea una instancia del componente para pruebas
    fixture = TestBed.createComponent(EventoContenidoComponent);
    // Asigna la instancia del componente a la variable
    component = fixture.componentInstance;
    // Detecta los cambios en el componente
    fixture.detectChanges();
  });

  // Prueba que verifica si el componente se crea correctamente
  it('should create', () => {
    // Asegura que el componente se haya creado
    expect(component).toBeTruthy();
  });
});

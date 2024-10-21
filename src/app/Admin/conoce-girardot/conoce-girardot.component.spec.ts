import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConoceGirardotComponent } from './conoce-girardot.component';

// Descripción de la prueba para el componente ConoceGirardotComponent
describe('ConoceGirardotComponent', () => {
  // Definición de las variables que se utilizarán en las pruebas
  let component: ConoceGirardotComponent;  // Variable que contendrá la instancia del componente
  let fixture: ComponentFixture<ConoceGirardotComponent>;  // Fixture que ayudará a crear el componente y manipular su DOM

  // Ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configura el módulo de pruebas
    await TestBed.configureTestingModule({
      // Importa el componente que se va a probar en el módulo
      imports: [ConoceGirardotComponent]
    })
      .compileComponents();  // Compila los componentes necesarios para las pruebas

    // Crea una instancia del componente y lo asigna a la variable fixture
    fixture = TestBed.createComponent(ConoceGirardotComponent);
    // Asigna la instancia del componente a la variable component
    component = fixture.componentInstance;
    // Realiza las actualizaciones del DOM del componente
    fixture.detectChanges();  // Detecta los cambios en el componente
  });

  // Prueba que el componente se cree correctamente
  it('should create', () => {
    // Asegura que la instancia del componente exista (es decir, que el componente se haya creado correctamente)
    expect(component).toBeTruthy();
  });
});

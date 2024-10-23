import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaComponent } from './sistema.component';

// Describe el conjunto de pruebas para el 'SistemaComponent'
describe('SistemaComponent', () => {
  let component: SistemaComponent; // Declara una variable para el componente que se va a probar
  let fixture: ComponentFixture<SistemaComponent>; // Declara una variable para el fixture, que es una instancia del componente envuelta en un contenedor de pruebas

  // Configura las pruebas antes de ejecutarlas
  beforeEach(async () => {
    // Configura el módulo de pruebas de Angular para el 'SistemaComponent'
    await TestBed.configureTestingModule({
      imports: [SistemaComponent] // Importa el componente en el entorno de pruebas
    })
      .compileComponents(); // Compila los componentes antes de ejecutarse

    // Crea una instancia del componente y lo asigna a 'fixture'
    fixture = TestBed.createComponent(SistemaComponent);
    // Asigna la instancia del componente que se va a probar a la variable 'component'
    component = fixture.componentInstance;
    // Ejecuta la detección de cambios inicial, necesaria para que el componente reaccione a las propiedades y datos
    fixture.detectChanges();
  });

  // Prueba unitaria que verifica si el componente se creó correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica si la instancia del componente existe (es decir, si se creó correctamente)
  });
});

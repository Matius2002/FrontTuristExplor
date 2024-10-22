import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesComponent } from './pages.component';

// Describe el bloque de pruebas para el componente PagesComponent
describe('PagesComponent', () => {

  // Declaración de variables que almacenarán la instancia del componente y el fixture
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  // Función que se ejecuta antes de cada prueba para configurar el entorno de pruebas
  beforeEach(async () => {

    // Configuración del módulo de pruebas de Angular
    await TestBed.configureTestingModule({
      // Se importa el PagesComponent para que esté disponible en el entorno de pruebas
      imports: [PagesComponent]
    })
      .compileComponents(); // Compila los componentes y plantillas

    // Se crea una instancia del fixture, que es un contenedor del componente a probar
    fixture = TestBed.createComponent(PagesComponent);

    // Se obtiene la instancia del componente que se está probando
    component = fixture.componentInstance;

    // Detecta cambios en el componente para asegurarse de que todo esta actualizado
    fixture.detectChanges();
  });

  // Prueba básica que verifica si el componente se crea correctamente
  it('should create', () => {
    // Verifica que el componente haya sido creado con éxito
    expect(component).toBeTruthy();
  });
});


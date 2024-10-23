import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesComponent } from './images.component';

// Describe bloque para agrupar las pruebas del componente ImagesComponent
describe('ImagesComponent', () => {
  // Declaración de las variables para el componente y su fixture
  let component: ImagesComponent; // Variable para instanciar el componente
  let fixture: ComponentFixture<ImagesComponent>; // Fixture para interactuar con el componente

  // Antes de cada prueba
  beforeEach(async () => {
    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [ImagesComponent] // Importar el componente que se va a probar
    })
      .compileComponents(); // Compilar los componentes

    // Crear la instancia del componente y su fixture
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance; // Instanciar el componente
    fixture.detectChanges(); // Detectar cambios en el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprobar que el componente es verdadero (se ha creado)
  });
});

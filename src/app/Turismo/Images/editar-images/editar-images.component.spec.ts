import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarImagesComponent } from './editar-images.component';

// Descripción del conjunto de pruebas para el componente EditarImagesComponent
describe('EditarImagesComponent', () => {
  let component: EditarImagesComponent; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<EditarImagesComponent>; // Variable para el fixture que crea el componente

  // Configuración de las pruebas antes de cada caso de prueba
  beforeEach(async () => {
    // Configuración del TestBed para el componente EditarImagesComponent
    await TestBed.configureTestingModule({
      imports: [EditarImagesComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes

    // Crea una instancia del componente y del fixture
    fixture = TestBed.createComponent(EditarImagesComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente
    fixture.detectChanges(); // Detecta los cambios en el fixture
  });

  // Caso de prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (exista)
  });
});

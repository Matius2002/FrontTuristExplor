import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaImagesComponent } from './nueva-images.component';

describe('NuevaImagesComponent', () => {
  let component: NuevaImagesComponent; // Declaración de la variable para el componente
  let fixture: ComponentFixture<NuevaImagesComponent>; // Declaración de la variable para el fixture del componente

  // Bloque que se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [NuevaImagesComponent] // Importa el componente que se está probando
    })
      .compileComponents(); // Compila los componentes para su uso en las pruebas

    // Crea una instancia del componente y del fixture
    fixture = TestBed.createComponent(NuevaImagesComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios para inicializar el componente
  });

  // Prueba para verificar si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Afirmación que verifica que el componente existe
  });
});

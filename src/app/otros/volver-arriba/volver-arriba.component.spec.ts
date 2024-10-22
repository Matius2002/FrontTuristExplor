import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolverArribaComponent } from './volver-arriba.component';

// Describe bloque para agrupar pruebas relacionadas al VolverArribaComponent
describe('VolverArribaComponent', () => {
  // Declaración de variables para el componente y su fixture
  let component: VolverArribaComponent; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<VolverArribaComponent>; // Variable para almacenar la fixture del componente

  // beforeEach se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configura el módulo de prueba
    await TestBed.configureTestingModule({
      imports: [VolverArribaComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes declarados en el módulo de prueba

    // Crea la fixture del componente para poder interactuar con él
    fixture = TestBed.createComponent(VolverArribaComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable
    fixture.detectChanges(); // Llama a detectChanges para que Angular realice la detección de cambios y renderice el componente
  });

  // Prueba individual que verifica la creación del componente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente haya sido creado correctamente
  });
});

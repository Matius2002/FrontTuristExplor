import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesAlojamientoComponent } from './detalles-alojamiento.component';

// Descripción del test suite para el componente DetallesAlojamientoComponent
describe('DetallesAlojamientoComponent', () => {
  let component: DetallesAlojamientoComponent; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<DetallesAlojamientoComponent>; // Variable para manejar el fixture (ambiente de pruebas) del componente

  // Configuración inicial antes de cada prueba
  beforeEach(async () => {
    // Configura el TestBed, que es el entorno de pruebas para los componentes
    await TestBed.configureTestingModule({
      imports: [DetallesAlojamientoComponent] // Importa el componente a probar
    })
      .compileComponents(); // Compila los componentes y sus dependencias

    // Crea una instancia del fixture para el componente
    fixture = TestBed.createComponent(DetallesAlojamientoComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Aplica los cambios detectados en el componente
  });

  // Prueba simple para verificar si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (se haya creado)
  });
});

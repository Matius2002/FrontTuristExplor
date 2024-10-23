import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestinosComponent } from './destinos.component';

describe('DestinosComponent', () => {
  let component: DestinosComponent; // Declaración de la variable para el componente Destinos
  let fixture: ComponentFixture<DestinosComponent>; // Declaración de la variable para el fixture del componente

  // Configuración del entorno de pruebas
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DestinosComponent] // Importa el componente Destinos para las pruebas
    })
      .compileComponents(); // Compila los componentes para pruebas

    // Crea una instancia del componente y del fixture
    fixture = TestBed.createComponent(DestinosComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable
    fixture.detectChanges(); // Detecta cambios en el fixture
  });

  // Test para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (exista)
  });
});

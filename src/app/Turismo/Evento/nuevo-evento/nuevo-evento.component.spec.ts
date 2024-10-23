import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoEventoComponent } from './nuevo-evento.component';

describe('NuevoEventoComponent', () => {
  let component: NuevoEventoComponent; // Declara una variable para el componente
  let fixture: ComponentFixture<NuevoEventoComponent>; // Declara una variable para la instancia del componente

  // Configura el entorno de pruebas antes de cada prueba
  beforeEach(async () => {
    // Configura el módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [NuevoEventoComponent] // Importa el componente a probar
    })
      .compileComponents(); // Compila los componentes asíncronamente

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(NuevoEventoComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios en la vista del componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Asegura que la instancia del componente sea verdadera
  });
});

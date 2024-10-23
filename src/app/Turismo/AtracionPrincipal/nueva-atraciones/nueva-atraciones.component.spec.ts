import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAtracionesComponent } from './nueva-atraciones.component';

describe('NuevaAtracionesComponent', () => {
  // Declara las variables para el componente y su fixture.
  let component: NuevaAtracionesComponent;
  let fixture: ComponentFixture<NuevaAtracionesComponent>;

  // Configura el entorno de pruebas antes de cada test.
  beforeEach(async () => {
    // Configura el TestBed para el componente NuevaAtracionesComponent.
    await TestBed.configureTestingModule({
      imports: [NuevaAtracionesComponent] // Importa el componente que se va a probar.
    })
      .compileComponents(); // Compila los componentes de prueba.

    // Crea una instancia del componente y su fixture.
    fixture = TestBed.createComponent(NuevaAtracionesComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente.

    // Detecta los cambios en el fixture para inicializar el componente.
    fixture.detectChanges();
  });

  // Prueba que el componente se crea correctamente.
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (no nula o indefinida).
  });
});

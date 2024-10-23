import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAlojamientoComponent } from './nuevo-alojamiento.component';

describe('NuevoAlojamientoComponent', () => {
  let component: NuevoAlojamientoComponent; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<NuevoAlojamientoComponent>; // Variable para la instancia del fixture

  // Configuración del módulo de prueba antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoAlojamientoComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes
  });

  // Configuración del fixture y la instancia del componente antes de cada prueba
  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAlojamientoComponent); // Crea una instancia del componente
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable
    fixture.detectChanges(); // Detecta cambios para inicializar el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera
  });
});

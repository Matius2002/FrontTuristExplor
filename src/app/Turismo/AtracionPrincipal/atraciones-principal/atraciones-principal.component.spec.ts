import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtracionesPrincipalComponent } from './atraciones-principal.component';

// Describe el conjunto de pruebas para el componente AtracionesPrincipalComponent
describe('AtracionesPrincipalComponent', () => {
  // Declaración de las variables para el componente y su fixture
  let component: AtracionesPrincipalComponent;
  let fixture: ComponentFixture<AtracionesPrincipalComponent>;

  // Configuración inicial de las pruebas
  beforeEach(async () => {
    // Configura el módulo de pruebas y compila el componente
    await TestBed.configureTestingModule({
      imports: [AtracionesPrincipalComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes en el módulo de pruebas

    // Crea una instancia del componente
    fixture = TestBed.createComponent(AtracionesPrincipalComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios en el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Asegura que el componente sea verdadero (exista)
  });
});


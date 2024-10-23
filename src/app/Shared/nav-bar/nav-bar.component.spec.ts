import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  // Declaración de variables para el componente y el fixture
  let component: NavBarComponent; // Variable que almacenará la instancia del componente
  let fixture: ComponentFixture<NavBarComponent>; // Variable que almacenará el fixture del componente

  // Configuración del entorno de prueba antes de cada caso de prueba
  beforeEach(async () => {
    // Configura el módulo de prueba para el componente NavBarComponent
    await TestBed.configureTestingModule({
      imports: [NavBarComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes declarados en el módulo de prueba

    // Crea una instancia del componente y el fixture asociado
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Realiza la detección de cambios para actualizar la vista
  });

  // Caso de prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (no nula o indefinida)
  });
});


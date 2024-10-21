import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesComponent } from './roles.component';

// Descripción del bloque de pruebas para el componente RolesComponent
describe('RolesComponent', () => {
  // Definición de las variables necesarias para el test
  let component: RolesComponent; // Variable para almacenar la instancia del componente
  let fixture: ComponentFixture<RolesComponent>; // Variable para manejar la instancia del fixture

  // Configuración que se ejecutará antes de cada prueba
  beforeEach(async () => {
    // Configuración del TestBed, que es el entorno de pruebas de Angular
    await TestBed.configureTestingModule({
      // Importa el componente que se va a testear
      imports: [RolesComponent]
    })
      .compileComponents(); // Compila los componentes del módulo de pruebas

    // Crea una instancia del componente en el fixture
    fixture = TestBed.createComponent(RolesComponent);

    // Asigna la instancia del componente a la variable `component`
    component = fixture.componentInstance;

    // Detecta los cambios de Angular y actualiza el estado del componente
    fixture.detectChanges();
  });

  // Prueba unitaria para verificar si el componente se crea correctamente
  it('should create', () => {
    // Expectativa: el componente debería crearse correctamente (no ser nulo o indefinido)
    expect(component).toBeTruthy(); // Verifica que el componente sea verdadero (existente)
  });
});


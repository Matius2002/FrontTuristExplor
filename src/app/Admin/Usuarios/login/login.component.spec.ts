import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

// Describe el conjunto de pruebas para el componente LoginComponent
describe('LoginComponent', () => {
  // Declara variables para el componente y el fixture
  let component: LoginComponent; // Componente que se está probando
  let fixture: ComponentFixture<LoginComponent>; // Fixture que permite interactuar con el componente

  // Función que se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configura el módulo de pruebas con el LoginComponent
    await TestBed.configureTestingModule({
      imports: [LoginComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes para que estén listos para las pruebas

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance; // Asigna el componente a la variable
    fixture.detectChanges(); // Detecta los cambios para inicializar el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente no sea nulo
  });
});

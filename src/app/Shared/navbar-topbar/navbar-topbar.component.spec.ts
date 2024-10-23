import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTopbarComponent } from './navbar-topbar.component';

describe('NavbarTopbarComponent', () => {
  // Declara variables para el componente y el fixture
  let component: NavbarTopbarComponent; // Variable que almacenará la instancia del componente
  let fixture: ComponentFixture<NavbarTopbarComponent>; // Variable que almacenará el fixture del componente

  // Función que se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configura el módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [NavbarTopbarComponent] // Importa el componente que se va a probar
    })
      .compileComponents(); // Compila los componentes declarados en el módulo

    // Crea el fixture para el componente y obtiene la instancia
    fixture = TestBed.createComponent(NavbarTopbarComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable
    fixture.detectChanges(); // Detecta cambios en el componente (ejecuta el ciclo de detección de cambios)
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (exista)
  });
});

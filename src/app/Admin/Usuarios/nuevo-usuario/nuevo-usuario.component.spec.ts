import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoUsuarioComponent } from './nuevo-usuario.component';

// Describe el grupo de pruebas para NuevoUsuarioComponent
describe('NuevoUsuarioComponent', () => {
  let component: NuevoUsuarioComponent; // Declara la variable para el componente
  let fixture: ComponentFixture<NuevoUsuarioComponent>; // Declara la variable para la fijación del componente

  // Configuración antes de cada prueba
  beforeEach(async () => {
    // Configura el TestBed con el componente que se va a probar
    await TestBed.configureTestingModule({
      imports: [NuevoUsuarioComponent] // Importa el componente para las pruebas
    })
      .compileComponents(); // Compila los componentes utilizados en las pruebas

    // Crea una instancia del componente y la fijación
    fixture = TestBed.createComponent(NuevoUsuarioComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios en el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente es verdadero (existe)
  });
});

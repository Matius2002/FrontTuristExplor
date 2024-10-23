import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarExperienciaComponent } from './editar-experiencia.component';

// Descripción del bloque de pruebas para el componente EditarExperienciaComponent
describe('EditarExperienciaComponent', () => {

  // Variables que se utilizarán para almacenar el componente y su fixture (el contenedor para el componente)
  let component: EditarExperienciaComponent;
  let fixture: ComponentFixture<EditarExperienciaComponent>;

  // Bloque que se ejecuta antes de cada prueba, configurando el entorno de pruebas
  beforeEach(async () => {
    // Configura el módulo de pruebas con el componente EditarExperienciaComponent
    await TestBed.configureTestingModule({
      imports: [EditarExperienciaComponent] // Importa el componente que se está probando
    })
      .compileComponents(); // Compila los componentes y sus dependencias

    // Crea una instancia de fixture y componente para interactuar con ellos
    fixture = TestBed.createComponent(EditarExperienciaComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente desde el fixture
    fixture.detectChanges(); // Detecta los cambios y actualiza la vista del componente
  });

  // Prueba para verificar que el componente se haya creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente exista (que haya sido creado correctamente)
  });
});

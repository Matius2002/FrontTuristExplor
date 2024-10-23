import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlojamientoComponent } from './editar-alojamiento.component';

describe('EditarAlojamientoComponent', () => {
  let component: EditarAlojamientoComponent;  // Instancia del componente a probar
  let fixture: ComponentFixture<EditarAlojamientoComponent>;  // Fixture para el componente

  // Configuración antes de cada prueba
  beforeEach(async () => {
    // Configuración del módulo de prueba
    await TestBed.configureTestingModule({
      imports: [EditarAlojamientoComponent]  // Importamos el componente que vamos a probar
    })
      .compileComponents();  // Compilamos los componentes del módulo de prueba

    // Creamos una instancia del componente y su fixture
    fixture = TestBed.createComponent(EditarAlojamientoComponent);
    component = fixture.componentInstance;  // Asignamos la instancia del componente
    fixture.detectChanges();  // Detectamos cambios para inicializar el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy();  // Esperamos que el componente exista
  });
});

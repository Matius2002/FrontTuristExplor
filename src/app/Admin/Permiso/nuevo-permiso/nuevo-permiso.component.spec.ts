import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoPermisoComponent } from './nuevo-permiso.component';

// Describe el conjunto de pruebas para el componente NuevoPermisoComponent
describe('NuevoPermisoComponent', () => {
  let component: NuevoPermisoComponent;  // Variable que almacenará el componente a probar
  let fixture: ComponentFixture<NuevoPermisoComponent>;  // Variable que contiene la referencia al fixture, es decir, el entorno donde se ejecuta el componente

  // beforeEach: Configuración inicial antes de ejecutar cada prueba
  beforeEach(async () => {
    // Configuración del TestBed, que define el entorno para pruebas unitarias de Angular
    await TestBed.configureTestingModule({
      // Se importa el componente que se va a probar
      imports: [NuevoPermisoComponent]  // No se necesitan otros módulos o servicios para este componente en particular
    })
      .compileComponents();  // Compila los componentes necesarios

    // Crea la instancia del componente para su uso en las pruebas
    fixture = TestBed.createComponent(NuevoPermisoComponent);
    component = fixture.componentInstance;  // Asigna la instancia del componente a la variable `component`

    // Detecta los cambios en el componente para aplicar el ciclo de vida inicial
    fixture.detectChanges();
  });

  // Test unitario: Verifica si el componente se crea correctamente
  it('should create', () => {
    // Espera que el componente se cree correctamente
    expect(component).toBeTruthy();  // Esta prueba pasa si el componente no es nulo o indefinido
  });
});


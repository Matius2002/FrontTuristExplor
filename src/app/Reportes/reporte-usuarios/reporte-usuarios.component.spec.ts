import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteUsuariosComponent } from './reporte-usuarios.component';

// Descripción del bloque de pruebas para ReporteUsuariosComponent
describe('ReporteUsuariosComponent', () => {
  let component: ReporteUsuariosComponent; // Declaración de la variable para la instancia del componente
  let fixture: ComponentFixture<ReporteUsuariosComponent>; // Declaración de la variable para acceder al entorno de prueba del componente

  // Este bloque se ejecuta antes de cada prueba individual
  beforeEach(async () => {
    // Configura el entorno de pruebas para el componente
    await TestBed.configureTestingModule({
      imports: [ReporteUsuariosComponent] // Se importan los módulos necesarios para el componente
    })
      .compileComponents(); // Compila las plantillas y estilos del componente

    // Crea una instancia del componente para la prueba
    fixture = TestBed.createComponent(ReporteUsuariosComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente
    fixture.detectChanges(); // Detecta los cambios en el componente y lo actualiza
  });

  // Prueba para verificar que el componente se ha creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (que exista)
  });
});

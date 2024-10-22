import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteSitiosComponent } from './reporte-sitios.component';

// Inicia la definición del bloque de pruebas para el componente ReporteSitiosComponent
describe('ReporteSitiosComponent', () => {
  // Define dos variables para el componente y el fixture (entorno de pruebas)
  let component: ReporteSitiosComponent; // Variable que contendrá una instancia del componente
  let fixture: ComponentFixture<ReporteSitiosComponent>; // Variable que manejará la instancia de pruebas del componente

  // Antes de cada prueba, configura el entorno de pruebas
  beforeEach(async () => {
    // Configura el módulo de pruebas, incluyendo el componente que se está probando
    await TestBed.configureTestingModule({
      imports: [ReporteSitiosComponent] // Importa el componente a probar
    })
      .compileComponents(); // Compila los componentes, asegurando que todo esté preparado para las pruebas

    // Crea una instancia del componente dentro del entorno de pruebas
    fixture = TestBed.createComponent(ReporteSitiosComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente a la variable `component`

    // Detecta los cambios iniciales para reflejar el estado inicial del componente
    fixture.detectChanges();
  });

  // Define una prueba que asegura que el componente ha sido creado exitosamente
  it('should create', () => {
    // Verifica si la instancia del componente es "verdadera" (es decir, que ha sido creada correctamente)
    expect(component).toBeTruthy();
  });
});

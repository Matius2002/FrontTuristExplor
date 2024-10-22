import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesComponent } from './reportes.component';

describe('ReportesComponent', () => {
  // Declaración de las variables que se usarán en el test
  let component: ReportesComponent;
  let fixture: ComponentFixture<ReportesComponent>;

  // Este bloque se ejecuta antes de cada prueba
  beforeEach(async () => {
    // Configura el entorno de pruebas para el componente
    await TestBed.configureTestingModule({
      // Importa el componente que será probado
      imports: [ReportesComponent]
    })
      // Compila los componentes para que estén listos para las pruebas
      .compileComponents();

    // Crea una instancia de la clase fixture, que permite acceder al DOM y al componente
    fixture = TestBed.createComponent(ReportesComponent);
    // Crea una instancia del componente
    component = fixture.componentInstance;
    // Detecta los cambios en la vista para que esté sincronizada con el componente
    fixture.detectChanges();
  });

  // Prueba básica que verifica si el componente se crea correctamente
  it('should create', () => {
    // Verifica que el componente se haya creado y no sea nulo o indefinido
    expect(component).toBeTruthy();
  });
});

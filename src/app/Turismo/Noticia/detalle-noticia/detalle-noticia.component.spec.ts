import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNoticiaComponent } from './detalle-noticia.component';

// Descripción del conjunto de pruebas para DetalleNoticiaComponent
describe('DetalleNoticiaComponent', () => {
  // Declaración de las variables para el componente y su fixture
  let component: DetalleNoticiaComponent;
  let fixture: ComponentFixture<DetalleNoticiaComponent>;

  // Configuración de las pruebas antes de cada test
  beforeEach(async () => {
    // Configuración del TestBed para importar el componente a probar
    await TestBed.configureTestingModule({
      imports: [DetalleNoticiaComponent] // Importa el componente
    })
      .compileComponents(); // Compila los componentes declarados

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(DetalleNoticiaComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios para inicializar la vista
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente es verdadera
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasContenidoComponent } from './noticias-contenido.component';

describe('NoticiasContenidoComponent', () => {
  let component: NoticiasContenidoComponent; // Declaración de la variable del componente
  let fixture: ComponentFixture<NoticiasContenidoComponent>; // Declaración de la variable para el fixture del componente

  // Configuración inicial antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasContenidoComponent] // Importación del componente que se va a probar
    })
      .compileComponents(); // Compila los componentes

    // Crea una instancia del componente y del fixture
    fixture = TestBed.createComponent(NoticiasContenidoComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios en el fixture
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que la instancia del componente sea verdadera (exista)
  });
});

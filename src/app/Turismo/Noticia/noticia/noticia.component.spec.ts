import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiaComponent } from './noticia.component';

describe('NoticiaComponent', () => {
  let component: NoticiaComponent; // Variable para el componente NoticiaComponent
  let fixture: ComponentFixture<NoticiaComponent>; // Variable para el fixture del componente

  // Configuración del test
  beforeEach(async () => {
    // Configuración asíncrona del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [NoticiaComponent] // Importa el componente a probar
    })
      .compileComponents(); // Compila los componentes del módulo

    // Crea una instancia del componente y del fixture
    fixture = TestBed.createComponent(NoticiaComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente
    fixture.detectChanges(); // Detecta los cambios en la vista
  });

  // Prueba que verifica si el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Asegura que la instancia del componente sea verdadera
  });
});

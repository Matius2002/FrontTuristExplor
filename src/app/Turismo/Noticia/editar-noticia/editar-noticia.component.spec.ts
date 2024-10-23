import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNoticiaComponent } from './editar-noticia.component';

describe('EditarNoticiaComponent', () => {
  // Declaramos las variables para el componente y la fixture
  let component: EditarNoticiaComponent;
  let fixture: ComponentFixture<EditarNoticiaComponent>;

  // Configuramos el entorno de pruebas antes de cada prueba
  beforeEach(async () => {
    // Configuración del TestBed para el componente
    await TestBed.configureTestingModule({
      imports: [EditarNoticiaComponent] // Importamos el componente a probar
    })
      .compileComponents(); // Compilamos los componentes

    // Creamos la instancia del componente y la fixture
    fixture = TestBed.createComponent(EditarNoticiaComponent);
    component = fixture.componentInstance; // Asignamos la instancia del componente
    fixture.detectChanges(); // Detectamos los cambios en la fixture
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprobamos que el componente es verdadero (existe)
  });
});

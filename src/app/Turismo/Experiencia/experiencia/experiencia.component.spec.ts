import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaComponent } from './experiencia.component';

// Describe el bloque de pruebas unitarias para el componente `ExperienciaComponent`
describe('ExperienciaComponent', () => {

  // Definimos dos variables, una para el componente y otra para el fixture.
  let component: ExperienciaComponent; // Instancia del componente
  let fixture: ComponentFixture<ExperienciaComponent>; // Entorno de prueba para el componente

  // Antes de cada prueba, se ejecuta esta función para configurar el entorno de pruebas
  beforeEach(async () => {
    // Configuración del TestBed con los módulos y componentes necesarios para las pruebas
    await TestBed.configureTestingModule({
      // Indicamos que importamos el componente `ExperienciaComponent` que vamos a probar
      imports: [ExperienciaComponent]
    })
      // Compilamos los componentes, plantillas y estilos
      .compileComponents();

    // Creamos el componente y lo asignamos a la variable `fixture`
    fixture = TestBed.createComponent(ExperienciaComponent);
    // Obtenemos la instancia del componente desde el fixture
    component = fixture.componentInstance;
    // Detectamos cambios en el componente para que las propiedades y el DOM estén actualizados
    fixture.detectChanges();
  });

  // Definimos una prueba unitaria que verifica si el componente fue creado correctamente
  it('should create', () => {
    // Esperamos que el componente se haya creado con éxito, es decir, que `component` sea "verdadero"
    expect(component).toBeTruthy();
  });
});

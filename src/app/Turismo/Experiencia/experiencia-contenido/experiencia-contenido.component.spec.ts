import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciaContenidoComponent } from './experiencia-contenido.component';

// Describe el bloque de pruebas unitarias para el componente `ExperienciaContenidoComponent`
describe('ExperienciaContenidoComponent', () => {

  // Declaramos dos variables: una para la instancia del componente y otra para el fixture.
  let component: ExperienciaContenidoComponent; // Instancia del componente que vamos a probar
  let fixture: ComponentFixture<ExperienciaContenidoComponent>; // Manejador de pruebas para el componente

  // Antes de cada prueba, ejecutamos esta configuración
  beforeEach(async () => {
    // Configuración del TestBed con los módulos y componentes necesarios
    await TestBed.configureTestingModule({
      // Indicamos que estamos importando el componente `ExperienciaContenidoComponent`
      imports: [ExperienciaContenidoComponent]
    })
      // Compilamos las plantillas, componentes y estilos asociados
      .compileComponents();

    // Creamos el componente y lo asignamos a la variable `fixture`
    fixture = TestBed.createComponent(ExperienciaContenidoComponent);
    // Asignamos la instancia del componente a la variable `component`
    component = fixture.componentInstance;
    // Detectamos los cambios en el componente para reflejarlos en el DOM
    fixture.detectChanges();
  });

  // Definimos una prueba que verifica si el componente se creó correctamente
  it('should create', () => {
    // Esperamos que la variable `component` sea "verdadera", es decir, que el componente fue creado exitosamente
    expect(component).toBeTruthy();
  });
});

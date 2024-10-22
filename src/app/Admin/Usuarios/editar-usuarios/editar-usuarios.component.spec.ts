import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuariosComponent } from './editar-usuarios.component';

describe('EditarUsuariosComponent', () => {
  // Definición de las variables necesarias para la prueba
  let component: EditarUsuariosComponent; // Variable que contendrá una instancia del componente
  let fixture: ComponentFixture<EditarUsuariosComponent>; // Fixture que se usa para interactuar con el componente en las pruebas

  // Antes de cada prueba individual, se ejecuta este bloque
  beforeEach(async () => {
    // Configuración del TestBed, que crea un entorno de prueba similar al de la aplicación real
    await TestBed.configureTestingModule({
      // Se importa el componente a probar
      imports: [EditarUsuariosComponent]
    })
      .compileComponents(); // Se compilan los componentes, lo que incluye su HTML, CSS, y TypeScript

    // Se crea una instancia del componente EditarUsuariosComponent
    fixture = TestBed.createComponent(EditarUsuariosComponent);

    // Se asigna la instancia del componente a la variable 'component'
    component = fixture.componentInstance;

    // Se detectan y aplican los cambios iniciales en el componente
    fixture.detectChanges();
  });

  // Prueba que verifica si el componente se crea correctamente
  it('should create', () => {
    // Se espera que la instancia del componente exista y sea verdadera (que se haya creado correctamente)
    expect(component).toBeTruthy();
  });
});

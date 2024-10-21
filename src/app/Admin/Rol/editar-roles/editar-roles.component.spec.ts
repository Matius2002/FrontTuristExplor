import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarRolesComponent } from './editar-roles.component';

describe('EditarRolesComponent', () => {
  let component: EditarRolesComponent;
  let fixture: ComponentFixture<EditarRolesComponent>;

  // Configuración del entorno de prueba (setup)
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarRolesComponent] // Aquí se importan los módulos necesarios
    })
      .compileComponents();  // Compila los componentes para que se pueda utilizar en las pruebas

    // Crea una instancia del componente y del fixture de prueba
    fixture = TestBed.createComponent(EditarRolesComponent);
    component = fixture.componentInstance;  // Accede a la instancia del componente
    fixture.detectChanges();  // Detecta cambios, como si se estuviera ejecutando el ciclo de vida ngOnInit
  });

  // Prueba unitaria básica para verificar la creación del componente
  it('should create', () => {
    expect(component).toBeTruthy();  // Espera que el componente exista (no sea null o undefined)
  });
});


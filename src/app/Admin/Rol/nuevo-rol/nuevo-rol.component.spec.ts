import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRolComponent } from './nuevo-rol.component';

describe('NuevoRolComponent', () => {
  let component: NuevoRolComponent;  // Declaración de la variable que almacenará el componente a probar
  let fixture: ComponentFixture<NuevoRolComponent>;  // Variable que gestionará el entorno de prueba para el componente

  // Antes de ejecutar las pruebas, configura el módulo de pruebas y compila los componentes necesarios
  beforeEach(async () => {
    // Configura el TestBed, que es el entorno de pruebas de Angular
    await TestBed.configureTestingModule({
      imports: [NuevoRolComponent]  // Importa el componente que se va a probar (en este caso, el componente 'NuevoRolComponent')
    })
      .compileComponents();  // Compila los componentes para poder usarlos en las pruebas

    // Crea una instancia del componente y obtiene el entorno de pruebas (fixture)
    fixture = TestBed.createComponent(NuevoRolComponent);
    component = fixture.componentInstance;  // Asigna la instancia del componente a la variable 'component'
    fixture.detectChanges();  // Detecta los cambios del ciclo de vida de Angular para aplicar el estado inicial
  });

  // Test de verificación para asegurar que el componente se cree correctamente
  it('should create', () => {
    expect(component).toBeTruthy();  // Espera que el componente se cree correctamente
  });
});

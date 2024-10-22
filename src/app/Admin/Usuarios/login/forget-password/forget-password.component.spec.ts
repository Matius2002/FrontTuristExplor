import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordComponent } from './forget-password.component';

describe('ForgetPasswordComponent', () => {
  let component: ForgetPasswordComponent;  // Variable que contendrá la instancia del componente ForgetPasswordComponent
  let fixture: ComponentFixture<ForgetPasswordComponent>;  // Variable para manejar el entorno de prueba del componente

  beforeEach(async () => {
    // Configuración inicial del entorno de pruebas antes de ejecutar cada prueba individual
    await TestBed.configureTestingModule({
      // Configura un módulo de pruebas con las dependencias necesarias para ForgetPasswordComponent
      imports: [ForgetPasswordComponent]  // Importa ForgetPasswordComponent para las pruebas
    })
      .compileComponents();  // Compila los componentes y plantillas asociados, asegurando que todo este listo para la prueba

    // Crea una instancia del componente ForgetPasswordComponent en un entorno de pruebas
    fixture = TestBed.createComponent(ForgetPasswordComponent);
    component = fixture.componentInstance;  // Obtiene la instancia del componente ForgetPasswordComponent
    fixture.detectChanges();  // Ejecuta la detección de cambios para actualizar el estado del componente
  });

  it('should create', () => {
    // Prueba básica que verifica si el componente ForgetPasswordComponent ha sido creado correctamente
    expect(component).toBeTruthy();  // Verifica que el componente exista (es decir, ha sido instanciado correctamente)
  });
});

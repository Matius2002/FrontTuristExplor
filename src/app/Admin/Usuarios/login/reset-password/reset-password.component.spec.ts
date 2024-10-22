import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';

// Descripción del test suite para el componente ResetPasswordComponent
describe('ResetPasswordComponent', () => {

  // Variables que almacenarán la instancia del componente y el fixture (el contenedor del componente para pruebas)
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  // Configuración antes de cada prueba
  beforeEach(async () => {
    // Se configura el entorno de pruebas para el componente, especificando que debe importar ResetPasswordComponent
    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent]  // Importación del componente para pruebas
    })
      .compileComponents();  // Compila el componente y sus plantillas para las pruebas

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;  // Obtiene la instancia del componente
    fixture.detectChanges();  // Aplica los cambios iniciales en el componente
  });

  // Prueba para verificar si el componente fue creado correctamente
  it('should create', () => {
    expect(component).toBeTruthy();  // Verifica que la instancia del componente sea verdadera (exista)
  });
});

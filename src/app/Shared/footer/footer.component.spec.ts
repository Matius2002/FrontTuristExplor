import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  // Configuración del entorno de pruebas
  beforeEach(async () => {
    // Configuración del TestBed para el componente FooterComponent
    await TestBed.configureTestingModule({
      imports: [FooterComponent] // Importa el FooterComponent
    })
      .compileComponents();

    // Crea una instancia del componente FooterComponent
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance; // Asigna la instancia del componente
    fixture.detectChanges(); // Realiza la detección de cambios para actualizar la vista
  });

  // Caso de prueba para verificar la creación del componente
  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente haya sido creado correctamente
  });
});

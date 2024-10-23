import { TestBed } from '@angular/core/testing';

import { AlojamientoService } from './alojamiento.service';

// Describe un bloque de pruebas para el servicio AlojamientoService.
describe('AlojamientoServiceService', () => {
  let service: AlojamientoService; // Declara una variable para el servicio que se va a probar.

  // Función que se ejecuta antes de cada prueba.
  beforeEach(() => {
    // Configura el módulo de pruebas y proporciona los servicios necesarios.
    TestBed.configureTestingModule({});
    // Inyecta la instancia del AlojamientoService en la variable 'service'.
    service = TestBed.inject(AlojamientoService);
  });

  // Define una prueba unitaria que verifica si el servicio se crea correctamente.
  it('should be created', () => {
    // Verifica que la instancia del servicio no sea nula, lo que indica que se ha creado correctamente.
    expect(service).toBeTruthy();
  });
});

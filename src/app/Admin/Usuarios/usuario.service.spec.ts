import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';

// Describe el bloque de pruebas para el UsuarioService
describe('UsuarioService', () => {
  // Declara una variable para almacenar la instancia del servicio
  let service: UsuarioService;

  // Esta función se ejecuta antes de cada prueba individual
  beforeEach(() => {
    // Configura el módulo de pruebas, aquí se puede añadir cualquier proveedor necesario
    TestBed.configureTestingModule({});

    // Inyecta el servicio UsuarioService para poder usarlo en las pruebas
    service = TestBed.inject(UsuarioService);
  });

  // Define una prueba individual que verifica la creación del servicio
  it('should be created', () => {
    // Comprueba que el servicio fue creado correctamente (no debe ser nulo o indefinido)
    expect(service).toBeTruthy();
  });
});


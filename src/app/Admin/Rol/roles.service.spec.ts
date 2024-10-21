import { TestBed } from '@angular/core/testing';

import { RolesService } from './roles.service';

// Descripción de la suite de pruebas unitarias para el servicio RolesService
describe('RolesService', () => {
  let service: RolesService;  // Variable que almacenará la instancia del servicio

  // Antes de cada prueba, configura el entorno de prueba
  beforeEach(() => {
    // Configura el módulo de prueba
    TestBed.configureTestingModule({});

    // Inyecta el servicio RolesService a partir del módulo de prueba
    service = TestBed.inject(RolesService);
  });

  // Prueba unitaria que verifica si el servicio ha sido creado correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();  // Verifica que la instancia del servicio sea verdadera (exista)
  });
});

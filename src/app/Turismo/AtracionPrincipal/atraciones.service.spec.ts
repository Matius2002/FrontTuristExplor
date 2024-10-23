import { TestBed } from '@angular/core/testing';

import { AtracionesService } from './atraciones.service';

// Describe un conjunto de pruebas para el servicio AtracionesService.
describe('AtracionesServiceService', () => {
  let service: AtracionesService; // Variable para almacenar la instancia del servicio.

  // Configura el entorno de pruebas antes de cada prueba.
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura el módulo de pruebas (actualmente vacío).
    service = TestBed.inject(AtracionesService); // Inyecta la instancia del servicio en la variable service.
  });

  // Prueba para verificar que el servicio se crea correctamente.
  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que la instancia del servicio no sea nula o indefinida.
  });
});

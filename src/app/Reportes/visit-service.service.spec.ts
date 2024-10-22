import { TestBed } from '@angular/core/testing';

import { VisitService } from './visit-service.service';

describe('VisitServiceService', () => {
  let service: VisitService; // Declara una variable para el servicio VisitService

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura el TestBed para el módulo de prueba
    service = TestBed.inject(VisitService); // Inyecta el servicio VisitService
  });

  // Prueba para verificar si el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio exista
  });
});

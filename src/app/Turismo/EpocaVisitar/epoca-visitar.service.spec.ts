import { TestBed } from '@angular/core/testing';

import { EpocaVisitarService } from './epoca-visitar.service';

// Descripción de la suite de pruebas para el servicio EpocaVisitarService
describe('EpocaVisitarService', () => {
  let service: EpocaVisitarService; // Declaración de la variable para el servicio

  // Configuración que se ejecuta antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configuración del módulo de prueba
    service = TestBed.inject(EpocaVisitarService); // Inyección del servicio en la variable
  });

  // Prueba para verificar que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Afirmación que verifica que el servicio existe
  });
});

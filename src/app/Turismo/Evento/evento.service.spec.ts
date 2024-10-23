import { TestBed } from '@angular/core/testing';

import { EventoService } from './evento.service';

describe('EventoService', () => {
  let service: EventoService; // Declara una variable para el servicio

  // Configura el entorno de pruebas antes de cada prueba
  beforeEach(() => {
    TestBed.configureTestingModule({}); // Configura el módulo de pruebas sin importar módulos adicionales
    service = TestBed.inject(EventoService); // Inyecta la instancia del servicio en la variable 'service'
  });

  // Prueba para verificar que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Asegura que la instancia del servicio sea verdadera
  });
});

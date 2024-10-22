import { TestBed } from '@angular/core/testing';

import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService; // Declara una variable para el servicio a probar

  // Configuración antes de cada prueba
  beforeEach(() => {
    // Configura un módulo de prueba
    TestBed.configureTestingModule({});

    // Inyecta el servicio en la variable 'service'
    service = TestBed.inject(ReportService);
  });

  // Prueba que verifica que el servicio se crea correctamente
  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio no sea nulo o indefinido
  });
});

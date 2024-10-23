import { TestBed } from '@angular/core/testing';

import { ExperienciaService } from './experiencia.service';

// Definición del bloque de pruebas para el servicio 'ExperienciaService'
describe('ExperienciaService', () => {

  // Declaramos una variable para almacenar la instancia del servicio
  let service: ExperienciaService;

  // beforeEach se ejecuta antes de cada prueba para configurar el entorno de prueba
  beforeEach(() => {
    // Configuración del entorno de pruebas para el servicio 'ExperienciaService'
    TestBed.configureTestingModule({});

    // Inyección del servicio 'ExperienciaService' en la variable 'service' mediante TestBed
    service = TestBed.inject(ExperienciaService);
  });

  // Prueba básica que verifica si el servicio fue creado correctamente
  it('should be created', () => {
    // La expectativa es que el servicio exista (sea truthy)
    expect(service).toBeTruthy();
  });
});

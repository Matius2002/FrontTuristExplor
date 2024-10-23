import { TestBed } from '@angular/core/testing';

import { ImagesService } from './images.service';

// Descripción del conjunto de pruebas para el servicio ImagesService
describe('ImagesService', () => {
  let service: ImagesService; // Declaración de la variable del servicio

  // Metodo que se ejecuta antes de cada prueba
  beforeEach(() => {
    // Configura el módulo de pruebas y declara las dependencias
    TestBed.configureTestingModule({});
    // Inyecta el servicio ImagesService en la variable service
    service = TestBed.inject(ImagesService);
  });

  // Prueba para verificar que el servicio se crea correctamente
  it('should be created', () => {
    // Verifica que el servicio haya sido creado (no sea null o undefined)
    expect(service).toBeTruthy();
  });
});

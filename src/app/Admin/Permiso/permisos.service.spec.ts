import { TestBed } from '@angular/core/testing';

import { PermisosService } from './permisos.service';

// Describe el conjunto de pruebas para PermisosService
describe('PermisosService', () => {
  let service: PermisosService;  // Variable para almacenar la instancia del servicio

  // Antes de cada prueba, se configura el módulo de pruebas
  beforeEach(() => {
    TestBed.configureTestingModule({});  // Configura el TestBed, que es un contenedor de pruebas de Angular
    service = TestBed.inject(PermisosService);  // Inyecta el servicio en la variable service
  });

  // Prueba básica para verificar que el servicio se ha creado correctamente
  it('should be created', () => {
    expect(service).toBeTruthy();  // Espera que la instancia del servicio sea válida
  });
});

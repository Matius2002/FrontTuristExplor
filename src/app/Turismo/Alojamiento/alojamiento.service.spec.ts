import { TestBed } from '@angular/core/testing';

import { AlojamientoService } from './alojamiento.service';

describe('AlojamientoServiceService', () => {
  let service: AlojamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlojamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

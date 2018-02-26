import { TestBed, inject } from '@angular/core/testing';

import { TipoSpesaService } from './tipo-spesa.service';

describe('TipoSpesaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoSpesaService]
    });
  });

  it('should be created', inject([TipoSpesaService], (service: TipoSpesaService) => {
    expect(service).toBeTruthy();
  }));
});

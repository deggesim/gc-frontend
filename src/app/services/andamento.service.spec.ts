import { TestBed, inject } from '@angular/core/testing';

import { AndamentoService } from './andamento.service';

describe('AndamentoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AndamentoService]
    });
  });

  it('should be created', inject([AndamentoService], (service: AndamentoService) => {
    expect(service).toBeTruthy();
  }));
});

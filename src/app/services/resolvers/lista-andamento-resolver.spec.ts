import { TestBed, inject } from '@angular/core/testing';

import { ListaAndamentoResolver } from './lista-andamento-resolver';

describe('ListaAndamentoResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListaAndamentoResolver]
    });
  });

  it('should be created', inject([ListaAndamentoResolver], (service: ListaAndamentoResolver) => {
    expect(service).toBeTruthy();
  }));
});

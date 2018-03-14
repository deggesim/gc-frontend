import { TestBed, inject } from '@angular/core/testing';

import { BollettaMensileResolver } from './bolletta-mensile-resolver';

describe('BollettaMensileResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BollettaMensileResolver]
    });
  });

  it('should be created', inject([BollettaMensileResolver], (service: BollettaMensileResolver) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { CarburanteMensileResolver } from './carburante-mensile-resolver';

describe('CarburanteMensileResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarburanteMensileResolver]
    });
  });

  it('should be created', inject([CarburanteMensileResolver], (service: CarburanteMensileResolver) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { SpesaMensileResolver } from './spesa-mensile-resolver';

describe('SpesaMensileResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpesaMensileResolver]
    });
  });

  it('should be created', inject([SpesaMensileResolver], (service: SpesaMensileResolver) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { SpeseFrequentiResolver } from './spese-frequenti-resolver.service';

describe('SpeseFrequentiResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeseFrequentiResolver]
    });
  });

  it('should be created', inject([SpeseFrequentiResolver], (service: SpeseFrequentiResolver) => {
    expect(service).toBeTruthy();
  }));
});

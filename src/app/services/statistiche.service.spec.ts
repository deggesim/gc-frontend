import { TestBed, inject } from '@angular/core/testing';

import { StatisticheService } from './statistiche.service';

describe('StatisticheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatisticheService]
    });
  });

  it('should be created', inject([StatisticheService], (service: StatisticheService) => {
    expect(service).toBeTruthy();
  }));
});

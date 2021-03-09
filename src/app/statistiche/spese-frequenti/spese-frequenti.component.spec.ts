import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpeseFrequentiComponent } from './spese-frequenti.component';

describe('SpeseFrequentiComponent', () => {
  let component: SpeseFrequentiComponent;
  let fixture: ComponentFixture<SpeseFrequentiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeseFrequentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeseFrequentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeseFrequentiComponent } from './spese-frequenti.component';

describe('SpeseFrequentiComponent', () => {
  let component: SpeseFrequentiComponent;
  let fixture: ComponentFixture<SpeseFrequentiComponent>;

  beforeEach(async(() => {
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

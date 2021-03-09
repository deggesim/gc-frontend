import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BollettaComponent } from './bolletta.component';

describe('BollettaComponent', () => {
  let component: BollettaComponent;
  let fixture: ComponentFixture<BollettaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BollettaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BollettaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpesaComponent } from './spesa.component';

describe('SpesaComponent', () => {
  let component: SpesaComponent;
  let fixture: ComponentFixture<SpesaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SpesaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CarburanteComponent } from './carburante.component';

describe('CarburanteComponent', () => {
  let component: CarburanteComponent;
  let fixture: ComponentFixture<CarburanteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CarburanteComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarburanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

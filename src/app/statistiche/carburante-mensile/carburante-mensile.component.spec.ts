import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarburanteMensileComponent } from './carburante-mensile.component';

describe('CarburanteMensileComponent', () => {
  let component: CarburanteMensileComponent;
  let fixture: ComponentFixture<CarburanteMensileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarburanteMensileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarburanteMensileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

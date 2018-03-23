import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesaComponent } from './spesa.component';

describe('SpesaComponent', () => {
  let component: SpesaComponent;
  let fixture: ComponentFixture<SpesaComponent>;

  beforeEach(async(() => {
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

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NotaComponent } from './nota.component';

describe('NotaComponent', () => {
  let component: NotaComponent;
  let fixture: ComponentFixture<NotaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

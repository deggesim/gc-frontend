import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BollettaMensileComponent } from './bolletta-mensile.component';

describe('BollettaMensileComponent', () => {
  let component: BollettaMensileComponent;
  let fixture: ComponentFixture<BollettaMensileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BollettaMensileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BollettaMensileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

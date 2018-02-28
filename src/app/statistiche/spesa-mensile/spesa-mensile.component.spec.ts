import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesaMensileComponent } from './spesa-mensile.component';

describe('SpesaMensileComponent', () => {
  let component: SpesaMensileComponent;
  let fixture: ComponentFixture<SpesaMensileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpesaMensileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpesaMensileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

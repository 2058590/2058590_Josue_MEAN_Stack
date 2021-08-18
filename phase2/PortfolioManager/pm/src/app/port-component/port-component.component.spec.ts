import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortComponentComponent } from './port-component.component';

describe('PortComponentComponent', () => {
  let component: PortComponentComponent;
  let fixture: ComponentFixture<PortComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

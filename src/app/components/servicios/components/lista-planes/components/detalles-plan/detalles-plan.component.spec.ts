import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPlanComponent } from './detalles-plan.component';

describe('DetallesPlanComponent', () => {
  let component: DetallesPlanComponent;
  let fixture: ComponentFixture<DetallesPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetallesPlanComponent]
    });
    fixture = TestBed.createComponent(DetallesPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

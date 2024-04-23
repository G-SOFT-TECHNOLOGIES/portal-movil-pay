import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetallePlanComponent } from './dialog-detalle-plan.component';

describe('DialogDetallePlanComponent', () => {
  let component: DialogDetallePlanComponent;
  let fixture: ComponentFixture<DialogDetallePlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetallePlanComponent]
    });
    fixture = TestBed.createComponent(DialogDetallePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetallePaquetesGtvComponent } from './dialog-detalle-paquetes-gtv.component';

describe('DialogDetallePaquetesGtvComponent', () => {
  let component: DialogDetallePaquetesGtvComponent;
  let fixture: ComponentFixture<DialogDetallePaquetesGtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetallePaquetesGtvComponent]
    });
    fixture = TestBed.createComponent(DialogDetallePaquetesGtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

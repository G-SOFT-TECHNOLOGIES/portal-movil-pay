import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoDetallePaqueteComponent } from './dialogo-detalle-paquete.component';

describe('DialogoDetallePaqueteComponent', () => {
  let component: DialogoDetallePaqueteComponent;
  let fixture: ComponentFixture<DialogoDetallePaqueteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoDetallePaqueteComponent]
    });
    fixture = TestBed.createComponent(DialogoDetallePaqueteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

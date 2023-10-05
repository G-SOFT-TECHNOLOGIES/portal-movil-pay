import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoResumenCuentaComponent } from './dialogo-resumen-cuenta.component';

describe('DialogoResumenCuentaComponent', () => {
  let component: DialogoResumenCuentaComponent;
  let fixture: ComponentFixture<DialogoResumenCuentaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoResumenCuentaComponent]
    });
    fixture = TestBed.createComponent(DialogoResumenCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

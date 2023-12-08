import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoResumenCuponesComponent } from './dialogo-resumen-cupones.component';

describe('DialogoResumenCuponesComponent', () => {
  let component: DialogoResumenCuponesComponent;
  let fixture: ComponentFixture<DialogoResumenCuponesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoResumenCuponesComponent]
    });
    fixture = TestBed.createComponent(DialogoResumenCuponesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

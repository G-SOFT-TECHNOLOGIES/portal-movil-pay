import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistrarTransferenciaComponent } from './dialog-registrar-transferencia.component';

describe('DialogRegistrarTransferenciaComponent', () => {
  let component: DialogRegistrarTransferenciaComponent;
  let fixture: ComponentFixture<DialogRegistrarTransferenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRegistrarTransferenciaComponent]
    });
    fixture = TestBed.createComponent(DialogRegistrarTransferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

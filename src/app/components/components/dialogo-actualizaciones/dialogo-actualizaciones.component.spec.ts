import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoActualizacionesComponent } from './dialogo-actualizaciones.component';

describe('DialogoActualizacionesComponent', () => {
  let component: DialogoActualizacionesComponent;
  let fixture: ComponentFixture<DialogoActualizacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoActualizacionesComponent]
    });
    fixture = TestBed.createComponent(DialogoActualizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

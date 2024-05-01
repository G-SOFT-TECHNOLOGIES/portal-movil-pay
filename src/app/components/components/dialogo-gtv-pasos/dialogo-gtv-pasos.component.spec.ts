import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoGtvPasosComponent } from './dialogo-gtv-pasos.component';

describe('DialogoGtvPasosComponent', () => {
  let component: DialogoGtvPasosComponent;
  let fixture: ComponentFixture<DialogoGtvPasosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoGtvPasosComponent]
    });
    fixture = TestBed.createComponent(DialogoGtvPasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

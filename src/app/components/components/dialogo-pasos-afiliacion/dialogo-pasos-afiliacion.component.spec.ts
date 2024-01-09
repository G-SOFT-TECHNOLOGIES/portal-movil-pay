import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPasosAfiliacionComponent } from './dialogo-pasos-afiliacion.component';

describe('DialogoPasosAfiliacionComponent', () => {
  let component: DialogoPasosAfiliacionComponent;
  let fixture: ComponentFixture<DialogoPasosAfiliacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoPasosAfiliacionComponent]
    });
    fixture = TestBed.createComponent(DialogoPasosAfiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

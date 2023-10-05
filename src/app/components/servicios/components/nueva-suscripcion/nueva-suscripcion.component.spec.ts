import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSuscripcionComponent } from './nueva-suscripcion.component';

describe('NuevaSubscripcionComponent', () => {
  let component: NuevaSuscripcionComponent;
  let fixture: ComponentFixture<NuevaSuscripcionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaSuscripcionComponent]
    });
    fixture = TestBed.createComponent(NuevaSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

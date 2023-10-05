import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlubicidadComponent } from './plubicidad.component';

describe('PlubicidadComponent', () => {
  let component: PlubicidadComponent;
  let fixture: ComponentFixture<PlubicidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlubicidadComponent]
    });
    fixture = TestBed.createComponent(PlubicidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosValidadosComponent } from './datos-validados.component';

describe('DatosValidadosComponent', () => {
  let component: DatosValidadosComponent;
  let fixture: ComponentFixture<DatosValidadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosValidadosComponent]
    });
    fixture = TestBed.createComponent(DatosValidadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

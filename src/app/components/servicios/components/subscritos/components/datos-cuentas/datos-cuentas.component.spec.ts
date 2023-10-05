import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosCuentasComponent } from './datos-cuentas.component';

describe('DatosCuentasComponent', () => {
  let component: DatosCuentasComponent;
  let fixture: ComponentFixture<DatosCuentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosCuentasComponent]
    });
    fixture = TestBed.createComponent(DatosCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

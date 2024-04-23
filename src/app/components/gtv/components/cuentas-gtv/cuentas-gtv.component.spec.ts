import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasGtvComponent } from './cuentas-gtv.component';

describe('CuentasGtvComponent', () => {
  let component: CuentasGtvComponent;
  let fixture: ComponentFixture<CuentasGtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CuentasGtvComponent]
    });
    fixture = TestBed.createComponent(CuentasGtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

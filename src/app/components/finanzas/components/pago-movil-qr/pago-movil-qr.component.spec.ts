import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMovilQrComponent } from './pago-movil-qr.component';

describe('PagoMovilQrComponent', () => {
  let component: PagoMovilQrComponent;
  let fixture: ComponentFixture<PagoMovilQrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagoMovilQrComponent]
    });
    fixture = TestBed.createComponent(PagoMovilQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

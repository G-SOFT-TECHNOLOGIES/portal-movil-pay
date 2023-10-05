import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoMovilComponent } from './pago-movil.component';

describe('PagoMovilComponent', () => {
  let component: PagoMovilComponent;
  let fixture: ComponentFixture<PagoMovilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PagoMovilComponent]
    });
    fixture = TestBed.createComponent(PagoMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

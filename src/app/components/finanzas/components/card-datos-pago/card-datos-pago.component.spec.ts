import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDatosPagoComponent } from './card-datos-pago.component';

describe('CardDatosPagoComponent', () => {
  let component: CardDatosPagoComponent;
  let fixture: ComponentFixture<CardDatosPagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardDatosPagoComponent]
    });
    fixture = TestBed.createComponent(CardDatosPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

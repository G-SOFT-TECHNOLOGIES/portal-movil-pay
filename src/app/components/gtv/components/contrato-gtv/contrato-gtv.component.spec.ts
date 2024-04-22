import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoGtvComponent } from './contrato-gtv.component';

describe('ContratoGtvComponent', () => {
  let component: ContratoGtvComponent;
  let fixture: ComponentFixture<ContratoGtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContratoGtvComponent]
    });
    fixture = TestBed.createComponent(ContratoGtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

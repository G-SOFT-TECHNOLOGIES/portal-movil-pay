import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoPagarComponent } from './dialogo-pagar.component';

describe('DialogoPagarComponent', () => {
  let component: DialogoPagarComponent;
  let fixture: ComponentFixture<DialogoPagarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoPagarComponent]
    });
    fixture = TestBed.createComponent(DialogoPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

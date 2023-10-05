import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistrarTicketsComponent } from './dialog-registrar-tickets.component';

describe('DialogRegistrarTicketsComponent', () => {
  let component: DialogRegistrarTicketsComponent;
  let fixture: ComponentFixture<DialogRegistrarTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRegistrarTicketsComponent]
    });
    fixture = TestBed.createComponent(DialogRegistrarTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

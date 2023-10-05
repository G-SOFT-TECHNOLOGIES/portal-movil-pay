import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPagarComponent } from './dialog-pagar.component';

describe('DialogPagarComponent', () => {
  let component: DialogPagarComponent;
  let fixture: ComponentFixture<DialogPagarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPagarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPagarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

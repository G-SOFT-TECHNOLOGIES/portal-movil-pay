import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPanatallaComponent } from './dialog-edit-panatalla.component';

describe('DialogEditPanatallaComponent', () => {
  let component: DialogEditPanatallaComponent;
  let fixture: ComponentFixture<DialogEditPanatallaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditPanatallaComponent]
    });
    fixture = TestBed.createComponent(DialogEditPanatallaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

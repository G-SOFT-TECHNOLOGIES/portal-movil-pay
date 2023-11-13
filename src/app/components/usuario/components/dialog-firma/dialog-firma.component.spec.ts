import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFirmaComponent } from './dialog-firma.component';

describe('DialogFirmaComponent', () => {
  let component: DialogFirmaComponent;
  let fixture: ComponentFixture<DialogFirmaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogFirmaComponent]
    });
    fixture = TestBed.createComponent(DialogFirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

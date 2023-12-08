import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCanjesComponent } from './pdf-canjes.component';

describe('PdfCanjesComponent', () => {
  let component: PdfCanjesComponent;
  let fixture: ComponentFixture<PdfCanjesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfCanjesComponent]
    });
    fixture = TestBed.createComponent(PdfCanjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

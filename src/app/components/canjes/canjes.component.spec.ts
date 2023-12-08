import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanjesComponent } from './canjes.component';

describe('CanjesComponent', () => {
  let component: CanjesComponent;
  let fixture: ComponentFixture<CanjesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CanjesComponent]
    });
    fixture = TestBed.createComponent(CanjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

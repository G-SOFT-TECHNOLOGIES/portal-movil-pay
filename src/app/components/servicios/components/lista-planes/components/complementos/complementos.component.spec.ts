import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementosComponent } from './complementos.component';

describe('ComplementosComponent', () => {
  let component: ComplementosComponent;
  let fixture: ComponentFixture<ComplementosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComplementosComponent]
    });
    fixture = TestBed.createComponent(ComplementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

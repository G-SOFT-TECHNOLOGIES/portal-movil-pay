import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GtvComponent } from './gtv.component';

describe('GtvComponent', () => {
  let component: GtvComponent;
  let fixture: ComponentFixture<GtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GtvComponent]
    });
    fixture = TestBed.createComponent(GtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

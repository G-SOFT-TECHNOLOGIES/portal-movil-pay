import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscritosComponent } from './subscritos.component';

describe('SubscritosComponent', () => {
  let component: SubscritosComponent;
  let fixture: ComponentFixture<SubscritosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubscritosComponent]
    });
    fixture = TestBed.createComponent(SubscritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

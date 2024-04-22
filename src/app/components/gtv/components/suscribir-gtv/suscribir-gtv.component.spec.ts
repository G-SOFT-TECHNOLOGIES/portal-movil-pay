import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscribirGtvComponent } from './suscribir-gtv.component';

describe('SuscribirGtvComponent', () => {
  let component: SuscribirGtvComponent;
  let fixture: ComponentFixture<SuscribirGtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuscribirGtvComponent]
    });
    fixture = TestBed.createComponent(SuscribirGtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

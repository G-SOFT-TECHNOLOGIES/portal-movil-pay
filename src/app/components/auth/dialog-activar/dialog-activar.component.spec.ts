import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActivarComponent } from './dialog-activar.component';

describe('DialogActivarComponent', () => {
  let component: DialogActivarComponent;
  let fixture: ComponentFixture<DialogActivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogActivarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogActivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

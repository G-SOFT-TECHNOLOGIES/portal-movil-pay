import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistrarPmComponent } from './dialog-registrar-pm.component';

describe('DialogRegistrarPmComponent', () => {
  let component: DialogRegistrarPmComponent;
  let fixture: ComponentFixture<DialogRegistrarPmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRegistrarPmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRegistrarPmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

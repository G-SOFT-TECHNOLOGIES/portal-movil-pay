import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistrarZelleComponent } from './dialog-registrar-zelle.component';

describe('DialogRegistrarZelleComponent', () => {
  let component: DialogRegistrarZelleComponent;
  let fixture: ComponentFixture<DialogRegistrarZelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRegistrarZelleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRegistrarZelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

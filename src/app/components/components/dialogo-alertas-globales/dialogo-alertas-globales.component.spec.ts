import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoAlertasGlobalesComponent } from './dialogo-alertas-globales.component';

describe('DialogoAlertasGlobalesComponent', () => {
  let component: DialogoAlertasGlobalesComponent;
  let fixture: ComponentFixture<DialogoAlertasGlobalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoAlertasGlobalesComponent]
    });
    fixture = TestBed.createComponent(DialogoAlertasGlobalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

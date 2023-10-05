import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListaPaquetesComponent } from './add-lista-paquetes.component';

describe('AddListaPaquetesComponent', () => {
  let component: AddListaPaquetesComponent;
  let fixture: ComponentFixture<AddListaPaquetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddListaPaquetesComponent]
    });
    fixture = TestBed.createComponent(AddListaPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

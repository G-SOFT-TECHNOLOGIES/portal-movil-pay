import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPaquetesComponent } from './lista-paquetes.component';

describe('ListaPaquetesComponent', () => {
  let component: ListaPaquetesComponent;
  let fixture: ComponentFixture<ListaPaquetesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaPaquetesComponent]
    });
    fixture = TestBed.createComponent(ListaPaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

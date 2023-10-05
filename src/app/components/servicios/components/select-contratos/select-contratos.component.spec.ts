import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectContratosComponent } from './select-contratos.component';

describe('SelectContratosComponent', () => {
  let component: SelectContratosComponent;
  let fixture: ComponentFixture<SelectContratosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectContratosComponent]
    });
    fixture = TestBed.createComponent(SelectContratosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

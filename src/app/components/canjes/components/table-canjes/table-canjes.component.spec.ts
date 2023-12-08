import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCanjesComponent } from './table-canjes.component';

describe('TableCanjesComponent', () => {
  let component: TableCanjesComponent;
  let fixture: ComponentFixture<TableCanjesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableCanjesComponent]
    });
    fixture = TestBed.createComponent(TableCanjesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

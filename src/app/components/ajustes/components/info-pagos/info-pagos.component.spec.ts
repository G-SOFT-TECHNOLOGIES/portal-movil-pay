import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPagosComponent } from './info-pagos.component';

describe('InfoPagosComponent', () => {
  let component: InfoPagosComponent;
  let fixture: ComponentFixture<InfoPagosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPagosComponent]
    });
    fixture = TestBed.createComponent(InfoPagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

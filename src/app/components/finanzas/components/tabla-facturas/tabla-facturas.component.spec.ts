import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaFacturasComponent } from './tabla-facturas.component';

describe('TablaFacturasComponent', () => {
  let component: TablaFacturasComponent;
  let fixture: ComponentFixture<TablaFacturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablaFacturasComponent]
    });
    fixture = TestBed.createComponent(TablaFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

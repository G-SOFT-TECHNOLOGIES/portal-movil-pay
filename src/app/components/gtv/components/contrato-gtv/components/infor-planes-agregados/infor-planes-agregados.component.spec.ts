import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforPlanesAgregadosComponent } from './infor-planes-agregados.component';

describe('InforPlanesAgregadosComponent', () => {
  let component: InforPlanesAgregadosComponent;
  let fixture: ComponentFixture<InforPlanesAgregadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InforPlanesAgregadosComponent]
    });
    fixture = TestBed.createComponent(InforPlanesAgregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

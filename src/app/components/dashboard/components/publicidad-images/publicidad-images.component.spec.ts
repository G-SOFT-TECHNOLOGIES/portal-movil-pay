import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadImagesComponent } from './publicidad-images.component';

describe('PublicidadImagesComponent', () => {
  let component: PublicidadImagesComponent;
  let fixture: ComponentFixture<PublicidadImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicidadImagesComponent]
    });
    fixture = TestBed.createComponent(PublicidadImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

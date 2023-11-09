import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadGifsComponent } from './publicidad-gifs.component';

describe('PublicidadGifsComponent', () => {
  let component: PublicidadGifsComponent;
  let fixture: ComponentFixture<PublicidadGifsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicidadGifsComponent]
    });
    fixture = TestBed.createComponent(PublicidadGifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

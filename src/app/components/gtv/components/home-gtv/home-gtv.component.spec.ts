import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGtvComponent } from './home-gtv.component';

describe('HomeGtvComponent', () => {
  let component: HomeGtvComponent;
  let fixture: ComponentFixture<HomeGtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeGtvComponent]
    });
    fixture = TestBed.createComponent(HomeGtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

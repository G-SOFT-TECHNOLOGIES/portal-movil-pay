import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZelleComponent } from './zelle.component';

describe('ZelleComponent', () => {
  let component: ZelleComponent;
  let fixture: ComponentFixture<ZelleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZelleComponent]
    });
    fixture = TestBed.createComponent(ZelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

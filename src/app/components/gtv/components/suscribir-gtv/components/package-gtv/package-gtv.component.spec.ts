import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageGtvComponent } from './package-gtv.component';

describe('PackageGtvComponent', () => {
  let component: PackageGtvComponent;
  let fixture: ComponentFixture<PackageGtvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageGtvComponent]
    });
    fixture = TestBed.createComponent(PackageGtvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

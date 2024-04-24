import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPackageComponent } from './dialog-add-package.component';

describe('DialogAddPackageComponent', () => {
  let component: DialogAddPackageComponent;
  let fixture: ComponentFixture<DialogAddPackageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddPackageComponent]
    });
    fixture = TestBed.createComponent(DialogAddPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditTvboxComponent } from './dialog-edit-tvbox.component';

describe('DialogEditTvboxComponent', () => {
  let component: DialogEditTvboxComponent;
  let fixture: ComponentFixture<DialogEditTvboxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEditTvboxComponent]
    });
    fixture = TestBed.createComponent(DialogEditTvboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

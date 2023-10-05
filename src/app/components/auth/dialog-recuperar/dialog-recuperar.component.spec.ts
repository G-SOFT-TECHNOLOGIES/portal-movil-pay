import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRecuperarComponent } from './dialog-recuperar.component';

describe('DialogRecuperarComponent', () => {
  let component: DialogRecuperarComponent;
  let fixture: ComponentFixture<DialogRecuperarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogRecuperarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRecuperarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforCardsComponent } from './infor-cards.component';

describe('InforCardsComponent', () => {
  let component: InforCardsComponent;
  let fixture: ComponentFixture<InforCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InforCardsComponent]
    });
    fixture = TestBed.createComponent(InforCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

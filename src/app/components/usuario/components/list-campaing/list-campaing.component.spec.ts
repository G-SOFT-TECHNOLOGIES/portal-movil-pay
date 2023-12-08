import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCampaingComponent } from './list-campaing.component';

describe('ListCampaingComponent', () => {
  let component: ListCampaingComponent;
  let fixture: ComponentFixture<ListCampaingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCampaingComponent]
    });
    fixture = TestBed.createComponent(ListCampaingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

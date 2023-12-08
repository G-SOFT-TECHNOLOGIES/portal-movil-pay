import { TestBed } from '@angular/core/testing';

import { CanjesService } from './canjes.service';

describe('CanjesService', () => {
  let service: CanjesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanjesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

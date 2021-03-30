import { TestBed } from '@angular/core/testing';

import { APIdataService } from './apidata.service';

describe('APIdataService', () => {
  let service: APIdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

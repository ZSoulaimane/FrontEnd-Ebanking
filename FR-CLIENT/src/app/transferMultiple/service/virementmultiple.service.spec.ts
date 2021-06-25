import { TestBed } from '@angular/core/testing';

import { VirementmultipleService } from './virementmultiple.service';

describe('VirementmultipleService', () => {
  let service: VirementmultipleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirementmultipleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

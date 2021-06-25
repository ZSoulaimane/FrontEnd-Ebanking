import { TestBed } from '@angular/core/testing';

import { BeneficiaireService } from './beneficiaire.service';

describe('BeneficiaireService', () => {
  let service: BeneficiaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

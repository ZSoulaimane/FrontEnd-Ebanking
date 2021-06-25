import { TestBed } from '@angular/core/testing';

import { CurrencyConversionService } from './currency-conversion.service';

describe('CurrencyConversionService', () => {
  let service: CurrencyConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

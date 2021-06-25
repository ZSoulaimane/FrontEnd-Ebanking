import { TestBed } from '@angular/core/testing';

import { BasicAuthHttpInterceptorService } from './basic-auth-http-interceptor.service';

describe('BasicAuthHttpInterceptorService', () => {
  let service: BasicAuthHttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicAuthHttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

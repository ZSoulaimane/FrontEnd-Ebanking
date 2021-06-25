import { TestBed } from '@angular/core/testing';

import { BasicAuthHtppInterceptorService } from './basic-auth-http-interceptor.service';

describe('BasicAuthHttpInterceptorService', () => {
  let service: BasicAuthHtppInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicAuthHtppInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ExpiredTokenInterceptorService } from './expired-token.interceptor';

describe('ExpiredTokenInterceptorService', () => {
  let service: ExpiredTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpiredTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

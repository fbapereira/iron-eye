import { TestBed } from '@angular/core/testing';
import { AuthServiceMock } from 'src/app/testing/auth-service.mock';

import { AuthService } from '../auth.service';

import { UrlInterceptor } from './url.interceptor';

describe('UrlInterceptor', () => {
  let service: UrlInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ]
    });
    service = TestBed.inject(UrlInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

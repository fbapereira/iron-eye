import { TestBed } from '@angular/core/testing';

import { AuthServiceMock } from '../../testing/auth-service.mock';
import { AuthService } from '../auth.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
      ]
    });
    service = TestBed.inject(AuthInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { NgxNotifierService } from 'ngx-notifier';
import { AuthServiceMock } from 'src/app/testing/auth-service.mock';
import { NgxNotifierServiceMock } from 'src/app/testing/notifier-service.mock';

import { AuthService } from '../auth.service';

import { ExpiredTokenInterceptor } from './expired-token.interceptor';

describe('ExpiredTokenInterceptor', () => {
  let service: ExpiredTokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: NgxNotifierService,
          useClass: NgxNotifierServiceMock,
        },
      ]
    });
    service = TestBed.inject(ExpiredTokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

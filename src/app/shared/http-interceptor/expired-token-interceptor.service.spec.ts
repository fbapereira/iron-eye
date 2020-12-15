import { TestBed, inject } from '@angular/core/testing';
import { NgxNotifierService } from 'ngx-notifier';
import { AuthServiceMock } from 'src/app/testing/auth-service.mock';
import { NgxNotifierServiceMock } from 'src/app/testing/notifier-service.mock';

import { AuthService } from '../auth.service';

import { ExpiredTokenInterceptor } from './expired-token.interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('ExpiredTokenInterceptor', () => {
  let service: ExpiredTokenInterceptor;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
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
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

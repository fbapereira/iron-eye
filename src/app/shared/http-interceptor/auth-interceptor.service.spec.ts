import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { AuthServiceMock } from '../../testing/auth-service.mock';
import { AuthService } from '../auth.service';

import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let service: AuthInterceptor;
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
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ]
    });
    service = TestBed.inject(AuthInterceptor);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not add Authorization',
    inject([HttpClient], (httpClient: HttpClient) => {
      const url = environment.url + '/testingUrl';
      httpClient.get(url).subscribe();
      const httpRequest = httpMock.expectOne(url);
      expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  }));

  it('should add Authorization',
    inject([HttpClient, AuthService], (httpClient: HttpClient, authService: AuthServiceMock) => {
      const url = environment.url + '/testingUrl';
      authService.token = 'Im in';
      httpClient.get(url).subscribe();
      const httpRequest = httpMock.expectOne(url);
      expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
  }));
});

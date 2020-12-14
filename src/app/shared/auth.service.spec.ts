import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxNotifierService } from 'ngx-notifier';

import { HTTPServiceMock } from '../testing/http-service.mock';
import { NgxNotifierServiceMock } from '../testing/notifier-service.mock';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'games', redirectTo: '' }])
      ],
      providers: [
        {
          provide: HttpClient,
          useClass: HTTPServiceMock,
        },
        {
          provide: NgxNotifierService,
          useClass: NgxNotifierServiceMock,
        },
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

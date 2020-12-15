import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxNotifierService } from 'ngx-notifier';

import { NgxNotifierServiceMock } from '../testing/notifier-service.mock';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'games', redirectTo: '' }])
      ],
      providers: [
        {
          provide: NgxNotifierService,
          useClass: NgxNotifierServiceMock,
        },
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

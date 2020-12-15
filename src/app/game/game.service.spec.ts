import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { NgxNotifierService } from 'ngx-notifier';

import { AuthService } from '../shared/auth.service';
import { AuthServiceMock } from '../testing/auth-service.mock';
import { NgxNotifierServiceMock } from '../testing/notifier-service.mock';

import { GameService } from './game.service';
import { currentUserGamesMock } from '../testing/game-service.mock';

describe('GameService', () => {
  let service: GameService;
  let httpTestingController: HttpTestingController;

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
      ],
    });
    service = TestBed.inject(GameService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addGame', () => {
    [
      { status: 409, message: 'This key has been used before.' },
      { status: 400, message: 'This key an invalid key.' },
    ].forEach(({ status, message }) => {
      it(`should message ${ message } when http status is ${ status } and return false`,
        inject([NgxNotifierService], (ngxNotifierService: NgxNotifierServiceMock) => {
          spyOn(ngxNotifierService, 'createToast');
          let result: any = 'Finish Him';
          service.addGame('secretKey').subscribe((value) => result = value);
          httpTestingController.expectOne('/user/me/key/secretKey').error({} as ErrorEvent, { status });
          expect(ngxNotifierService.createToast).toHaveBeenCalledWith(message);
          expect(result).toBe(false);
      }));
    });

    it('should return true when game is added',
      inject([NgxNotifierService], (ngxNotifierService: NgxNotifierServiceMock) => {
        spyOn(ngxNotifierService, 'createToast');
        let result: any = 'Finish Her';
        service.addGame('secretKey').subscribe((value) => result = value);
        httpTestingController.expectOne('/user/me/key/secretKey').flush({});
        expect(ngxNotifierService.createToast).not.toHaveBeenCalled();
        expect(result).toBe(true);
    }));
  });

  describe('games$', () => {
    it('should return null when not authenticated',
      inject([AuthService], (authServiceMock: AuthServiceMock) => {
        let user: any = `Nothing is true, everything is permitted`;
        service.games$.subscribe((value) => user = value);
        authServiceMock.isAuthenticated$.next(false);
        httpTestingController.expectNone('/game');
        expect(user).toBe(null);
    }));

    it('should return games when authenticated',
      inject([AuthService], (authServiceMock: AuthServiceMock) => {
        let users: any = `Nothing is true, everything is permitted`;
        service.games$.subscribe((value) => users = value);
        authServiceMock.isAuthenticated$.next(true);
        httpTestingController.expectOne('/game').flush(currentUserGamesMock);
        expect(users).toBe(currentUserGamesMock);
    }));
  });
});

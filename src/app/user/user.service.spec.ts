import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from '../shared/auth.service';
import { AuthServiceMock } from '../testing/auth-service.mock';

import { UserService } from './user.service';
import { targetUser } from '../testing/user-service.mock';
import { of } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
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
      ],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentUser$', () => {
    it('should return user when authenticated',
      inject([AuthService], (authServiceMock: AuthServiceMock) => {
        let user: any = `Nothing is true, everything is permitted`;
        service.currentUser$.subscribe((value) => user = value);
        authServiceMock.isAuthenticated$.next(true);
        httpTestingController.expectOne('/user/me').flush(targetUser);
        expect(user).toBe(targetUser);
    }));

    it('should return null when not authenticated',
      inject([AuthService], (authServiceMock: AuthServiceMock) => {
        let user: any = `Nothing is true, everything is permitted`;
        service.currentUser$.subscribe((value) => user = value);
        authServiceMock.isAuthenticated$.next(false);
        httpTestingController.expectNone('/user/me');
        expect(user).toBe(null);
    }));
  });

  it('should clean cache when logout', inject([AuthService], (authServiceMock: AuthServiceMock) => {
    spyOn(authServiceMock, 'cleanToken');
    service.logout();
    expect(authServiceMock.cleanToken).toHaveBeenCalled();
  }));
});

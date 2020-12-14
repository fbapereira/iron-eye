import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from '../shared/auth.service';
import { AuthServiceMock } from '../testing/auth-service.mock';

import { UserService } from './user.service';
import { HTTPServiceMock } from '../testing/http-service.mock';
import { targetUser } from '../testing/user-service.mock';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: HttpClient,
          useClass: HTTPServiceMock,
        }
      ],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('currentUser$', () => {
    it('should return user when authenticated',
      inject([AuthService, HttpClient], (authServiceMock: AuthServiceMock, httpClient: HTTPServiceMock) => {
        spyOn(httpClient, 'get').and.returnValue(of(targetUser));
        let user: any = `fas`;
        service.currentUser$.subscribe((value) => user = value);
        authServiceMock.isAuthenticated$.next(true);
        expect(user).toBe(targetUser);
    }));

    it('should get user info',
      inject([AuthService, HttpClient], (authServiceMock: AuthServiceMock, httpClient: HTTPServiceMock) => {
        spyOn(httpClient, 'get').and.returnValue(of(targetUser));
        let user: any = `fas`;
        service.currentUser$.subscribe((value) => user = value);
        authServiceMock.isAuthenticated$.next(true);
        expect(httpClient.get).toHaveBeenCalledWith('/user/me');
    }));

    it('should return null when not authenticated',
      inject([AuthService, HttpClient], (authServiceMock: AuthServiceMock, httpClient: HTTPServiceMock) => {
        spyOn(httpClient, 'get').and.returnValue(of(targetUser));
        let user: any = `fas`;
        service.currentUser$.subscribe((value) => user = value);
        authServiceMock.isAuthenticated$.next(false);
        expect(user).toBeNull();
    }));
  });

  it('should clean cache when logout', inject([AuthService], (authServiceMock: AuthServiceMock) => {
    spyOn(authServiceMock, 'cleanToken');
    service.logout();
    expect(authServiceMock.cleanToken).toHaveBeenCalled();
  }));
});

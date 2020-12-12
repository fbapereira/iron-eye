import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { pluck, switchMap, map, distinctUntilChanged, filter, shareReplay } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public currentUser$: Observable<User> = this.authService.isAuthenticated$.pipe(
    switchMap((isAuthenticated) => {
      return isAuthenticated ? this.getCurrentUser() : of(null);
    }),
    shareReplay(),
  );

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  public logout(): void {
    this.authService.cleanToken();
  }

  private getCurrentUser(): Observable<User> {
    return this.http.get<User>('/user/me');
  }

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>('/user');
  }
}

import { Injectable } from '@angular/core';

import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { pluck, switchMap, map, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public currentUser$: Observable<User> = this.authService.isAuthenticated$.pipe(
    distinctUntilChanged(),
    switchMap((isAuthenticated) => isAuthenticated ? this.getCurrentUser() : of(null)),
  );

  public isAdmin$: Observable<boolean> = this.currentUser$.pipe(pluck('isAdmin'));

  public users$: Observable<User[]> = this.isAdmin$.pipe(
    switchMap((isAdmin) => isAdmin ? this.getUsers() : of(null)),
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

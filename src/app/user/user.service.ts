import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * current login user
   */
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

  /**
   * logs the user out
   */
  public logout(): void {
    this.authService.cleanToken();
  }

  /**
   * Gets your own user account information. Requires authentication.
   */
  private getCurrentUser(): Observable<User> {
    return this.http.get<User>('/user/me');
  }
}

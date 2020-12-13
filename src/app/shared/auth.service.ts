import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxNotifierService } from 'ngx-notifier';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, pluck, catchError } from 'rxjs/operators';

import { User } from '../user/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token: string;

  /**
   * Get server access token
   */
  get token(): string {
    return this._token;
  }

  /**
   * Set server access token
   */
  set token(value: string) {
    value ? localStorage.setItem('token', value) : localStorage.clear();
    this._token = value;
    this.isAuthenticated$.next(!!this._token);
  }

  /**
   * Emits when the authentication status changes
   */
  public isAuthenticated$ = new BehaviorSubject<boolean>(!!this.token);

  constructor(
    private http: HttpClient,
    private ngxNotifierService: NgxNotifierService,
    private router: Router,
  ) {
    this.token = localStorage.getItem('token');
  }

  /**
   * Authenticate the user
   * @param user to be authenticate [Email and password required]
   */
  public auth(user: User): Observable<boolean> {
    return this.http.post('/auth', user)
    .pipe(
      catchError((err) => {
        this.ngxNotifierService.createToast('The combination of email and password is not valid.', 'info', 500);
        return throwError(err);
      }),
      pluck('token'),
      tap((token: string) => this.token = token),
      map((token: string) => !!token),
      tap((isAuthenticated: boolean) => this.isAuthenticated$.next(isAuthenticated)),
    );
  }

  public cleanToken(): void {
    this.token = null;
    this.router.navigate(['/']);
  }
}

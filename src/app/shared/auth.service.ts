import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { map, tap, pluck, catchError } from 'rxjs/operators';

import { User } from '../user/user.model';
import { NgxNotifierService } from 'ngx-notifier';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private _token: string;

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    localStorage.setItem('token', value);
    this._token = value;
    this.isAuthenticated$.next(!!this.token);
  }

  public isAuthenticated$ = new BehaviorSubject<boolean>(!!this.token);

  constructor(
    private http: HttpClient,
    private ngxNotifierService: NgxNotifierService
  ) {
    this.token = localStorage.getItem('token');
  }

  public auth(user: User): Observable<boolean> {
    return this.http.post('/auth', user)
    .pipe(
      catchError((err) => {
        this.ngxNotifierService.createToast('asdsd', 'info', 50000);
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
    localStorage.clear(); // fall back, just in case
  }
}

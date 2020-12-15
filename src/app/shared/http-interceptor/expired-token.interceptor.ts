import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxNotifierService } from 'ngx-notifier';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpiredTokenInterceptor {
  constructor(
    private ngxNotifierService: NgxNotifierService,
    private authService: AuthService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401 && !err.url.includes('auth')) {
          this.authService.cleanToken();
          this.ngxNotifierService.createToast('Your session has expired');
        }
        return throwError(err);
      }),
    );
  }
}

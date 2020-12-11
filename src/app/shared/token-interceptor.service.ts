import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add token
    if (this.auth.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        },
      });
    }

    // fix URL
    request = request.clone({
      url: environment.url + request.url,
    });

    return next.handle(request);
  }
}
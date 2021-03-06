import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService,
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add token
    if (this.auth.token && request.url.includes(environment.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.token}`
        },
      });
    }
    return next.handle(request);
  }
}
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UrlInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // fix URL
    request = request.clone({
      url: environment.url + request.url,
    });

    return next.handle(request);
  }
}
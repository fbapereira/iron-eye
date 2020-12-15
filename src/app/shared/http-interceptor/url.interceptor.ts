import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class UrlInterceptor implements HttpInterceptor {
  constructor(
    public auth: AuthService
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // fix URL
    request = request.clone({
      url: !request.url.includes('http') ? environment.url + request.url : request.url,
    });
    return next.handle(request);
  }
}
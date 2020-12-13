import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { Observable } from "rxjs";
import { tap, map } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })

export class UnAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      tap((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        }
      }),
      map((isAuthenticated: boolean) => !isAuthenticated),
    )
  }
}
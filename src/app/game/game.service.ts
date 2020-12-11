import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxNotifierService } from 'ngx-notifier';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';

import { Game } from './game.model';


@Injectable()
export class GameService {

  /**
   * List of all games
   */
  games$: Observable<Game[]> = this.authService.isAuthenticated$.pipe(
    switchMap((isAuthenticated) => isAuthenticated ? this.getGames() : of(null)),
  );

  /**
   * List of games owned by the logged user
   */
  currentUserGames$: Observable<Game[]> = this.authService.isAuthenticated$.pipe(
    switchMap((isAuthenticated) => isAuthenticated ? this.getCurrentUserGames() : of(null)),
  );

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ngxNotifierService: NgxNotifierService,
  ) {
  }

  /**
   * Redeem a key for your account.
   * A 409 status indicates a previously redeemed key.
   * Requires authentication.
   */
  public addGame(key: string): Observable<boolean> {
    return this.http.put<boolean>(`/user/me/key/${key}`, {}).pipe(
      catchError((err) => {
        // TODO
        debugger;
        if (err.status) {
          this.ngxNotifierService.createToast('The combination of email and password is not valid.', 'info', 500);
        }
        return of(false);
      }),
    );
  }

  /**
   * Gets all games owned by a user.
   * Requires authentication and Admin authorization.
   */
  private getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/game');
  }

  /**
   * Gets the games owned by you.
   * Requires authentication.
   */
  private getCurrentUserGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/user/me/game');
  }
}

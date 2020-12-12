import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxNotifierService } from 'ngx-notifier';
import { Observable, of, throwError, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { switchMap, catchError, distinctUntilChanged, shareReplay, map, tap, filter, startWith } from 'rxjs/operators';

import { AuthService } from '../shared/auth.service';

import { Game } from './game.model';


@Injectable()
export class GameService {
  private gameAdded$ = new Subject<boolean>();

  /**
   * List of all games
   */
  games$: Observable<Game[]> = this.authService.isAuthenticated$.pipe(
    switchMap((isAuthenticated) => isAuthenticated ? this.getGames() : of(null)),
  );

  /**
   * List of games owned by the logged user
   */
  currentUserGames$: Observable<Game[]> = this.gameAdded$.asObservable().pipe(
    tap((a) => alert(a)),
    startWith(true),
    // filter((hasAdded) => hasAdded),
    switchMap(() => this.getCurrentUserGames())
  );

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private ngxNotifierService: NgxNotifierService,
  ) {
    this.gameAdded$.subscribe((a) => alert('sub ' + a));
  }

  /**
   * Redeem a key for your account.
   * A 409 status indicates a previously redeemed key.
   * Requires authentication.
   */
  public addGame(key: string): Observable<boolean> {
    return this.http.put<Game>(`/user/me/key/${key}`, {}).pipe(
      switchMap(() => of(true)),
      catchError((err) => {
        if (err.status === 409) {
          this.ngxNotifierService.createToast('This key has been used before.');
        } else if (err.status === 400) {
          this.ngxNotifierService.createToast('This key an invalid key.');
        }
        return of(false);
      }),
      tap((hasAdded) => this.gameAdded$.next(hasAdded)),
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

  private getGameVideo(): string {
    this.http.get('https://youtube.googleapis.com/youtube/v3/search?q=assasin%20creed&key=AIzaSyDrk2rwYUcB1TnpKE37kpHUXsX1GwpwTWE');
    return 'a';
  }
}

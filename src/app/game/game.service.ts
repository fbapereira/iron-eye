import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Game } from './game.model';
import { AuthService } from '../shared/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GameService {

  games$: Observable<Game[]> = this.authService.isAuthenticated$.pipe(
    switchMap((isAuthenticated) => isAuthenticated ? this.getGames() : of(null)),
  );

  currentUserGames$: Observable<Game[]> = this.authService.isAuthenticated$.pipe(
    switchMap((isAuthenticated) => isAuthenticated ? this.getCurrentUserGames() : of(null)),
  );

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) {
  }

  public addGame(key: string): Observable<boolean> {
    return this.http.put<boolean>(`/user/me/key/${key}`, {});
  }

  private getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/game');
  }

  private getCurrentUserGames(): Observable<Game[]> {
    return this.http.get<Game[]>('/user/me/game');
  }
}

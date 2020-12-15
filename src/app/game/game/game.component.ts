import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxNotifierService } from 'ngx-notifier';
import { combineLatest, Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';

import { Game } from '../game.model';
import { GameService } from '../game.service';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent {

  /**
   * Game to be loaded
   */
  public game$: Observable<Game> = combineLatest([
    this.activatedRoute.queryParams,
    this.gameService.currentUserGames$,
  ]).pipe(
    map(([params, games]) => games.filter((game) => game.gameId === Number(params.id))[0]),
    tap((game: Game) => {
      if (!game) {
        this.ngxNotifierService.createToast('Game not found');
        this.route.navigate(['/games']);
      }
      return game;
    }),
  );

  /**
   * Official trailer url
   */
  public videoUrl$ = this.game$.pipe(
    switchMap((game: Game) => this.youtubeService.getVideo(game)),
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private ngxNotifierService: NgxNotifierService,
    private route: Router,
    private youtubeService: YoutubeService,
  ) {
  }
}

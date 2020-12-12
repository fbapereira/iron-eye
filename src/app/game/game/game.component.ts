import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { Game } from '../game.model';
import { NgxNotifierService } from 'ngx-notifier';
import { YoutubeService } from './../youtube.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  game$: Observable<Game> = combineLatest([
    this.activatedRoute.queryParams,
    this.gameService.currentUserGames$,
  ]).pipe(
    map(([params, games]) => games.filter((game) => game.gameId === Number(params.id))[0]),
    tap((game) => {
      if (!game) {
        this.ngxNotifierService.createToast('Game not found');
        this.route.navigate(['/games']);
      }
      return game;
    }),
  );

    video$ = this.game$.pipe(
      switchMap((game) => this.youtubeService.getVideo(game))
    )

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private ngxNotifierService: NgxNotifierService,
    private youtubeService: YoutubeService,

  ) {
  }
}

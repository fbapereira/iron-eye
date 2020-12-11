import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, fromEvent, combineLatest } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements AfterViewInit {
  @ViewChild('searchInput')
  input: ElementRef;

  @Input()
  showFilter: boolean = true;


  searchText$: Observable<any>;

  games$: Observable<Game[]>


  constructor(
    private gameService: GameService,
  ) {
  }

  ngAfterViewInit(): void {
    this.searchText$ = fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map(event => event.target.value),
        map(event => event.toUpperCase()),
        startWith(''),
        debounceTime(400),
        distinctUntilChanged(),
      );

    this.games$ = combineLatest([
      this.gameService.currentUserGames$,
      this.searchText$
    ]).pipe(
      map(([games, searchText]) => {
        let selectedGames = games;

        if (!!searchText) {
          selectedGames = selectedGames.filter((game: Game) => (game.name.toUpperCase().indexOf(searchText) > -1));
        }
        return selectedGames;
      }),
    );
  }
}

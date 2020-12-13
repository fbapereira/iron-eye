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

  /**
   * list of the games to be displayed
   */
  public games$: Observable<Game[]>

  /**
   * search text changed
   */
  private searchTextChanged$: Observable<any>;

  constructor(
    private gameService: GameService,
  ) {
  }

  ngAfterViewInit(): void {
    this.addSearchTextChangedEvent();
    this.addGameFilter();
  }

  private addSearchTextChangedEvent() {
    this.searchTextChanged$ = fromEvent<any>(this.input.nativeElement, 'keyup')
    .pipe(
      map(event => event.target.value),
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
    );
  }

  private addGameFilter() {
    this.games$ = combineLatest([
      this.gameService.currentUserGames$,
      this.searchTextChanged$,
    ]).pipe(
      map(([games, searchText]) =>
        !!searchText ?
          games.filter((game: Game) => (game.name.search(new RegExp(searchText, 'i')) > -1)) :
          games
      ),
    );
  }
}

import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable, fromEvent, combineLatest } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { Game } from '../game.model';
import { GameService } from '../game.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements AfterViewInit {
  @ViewChild('searchInput')
  input: ElementRef;

  /**
   * Login form
   */
  form: FormGroup;

  /**
   * list of the games to be displayed
   */
  public games$: Observable<Game[]>

  /**
   * search text changed
   */
  private searchTextChanged$: Observable<string>;

  /**
   * order by changed
   */
  private orderByChanged$: Observable<string>;

  constructor(
    private gameService: GameService,
    private fb: FormBuilder,
  ) {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.addSearchTextChangedEvent();
    this.addOrderByChangedEvent();
    this.addGameFilter();
  }

  private createForm(): void {
    this.form = this.fb.group({
      search: [''],
      orderBy: ['asc'],
    });
  }
  private addSearchTextChangedEvent() {
    this.searchTextChanged$ = this.form.controls.search.valueChanges
    .pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
    );
  }

  private addOrderByChangedEvent() {
    this.orderByChanged$ = this.form.controls.orderBy.valueChanges
    .pipe(
      startWith(this.form.controls.orderBy.value),
      distinctUntilChanged(),
    );
  }

  private addGameFilter() {
    this.games$ = combineLatest([
      this.gameService.currentUserGames$,
      this.searchTextChanged$,
      this.orderByChanged$,
    ]).pipe(
      map(([games, searchText, orderby]) => {
        const targetGames = !!searchText ?
          games.filter((game: Game) => (game.name.search(new RegExp(searchText, 'i')) > -1)) :
          games;

        return orderby === 'asc' ?
          targetGames.sort((a, b) => (a.name > b.name) ? 1 : -1) :
          targetGames.sort((a, b) => (a.name < b.name) ? 1 : -1);
      }),
    );
  }
}

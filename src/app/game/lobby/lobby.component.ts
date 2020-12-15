import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { fadeInOutAnimation } from '../../shared/animations';
import { Game } from '../game.model';
import { GameService } from '../game.service';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  animations: fadeInOutAnimation,
})
export class LobbyComponent implements AfterViewInit {
  @ViewChild('searchInput')
  public input: ElementRef;

  /**
   * Login form
   */
  public form: FormGroup;

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

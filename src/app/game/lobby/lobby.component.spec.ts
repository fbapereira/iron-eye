import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { GameServiceMock, currentUserGamesMock, targetGame } from 'src/app/testing/game-service.mock';

import { GameService } from '../game.service';

import { LobbyComponent } from './lobby.component';

describe('LobbyComponent', () => {
  let component: LobbyComponent;
  let fixture: ComponentFixture<LobbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([{ path: 'games', redirectTo: '' }]),
        BrowserAnimationsModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: GameService,
          useClass: GameServiceMock,
        },
      ],
      declarations: [
        LobbyComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LobbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('games$', () => {
    describe('when searching', () => {
      it('should return all game when no parameter is add',
        fakeAsync(inject([GameService], (gameService: GameServiceMock) => {
          let games: any = 'Its a-me, Mario!';
          component.games$.subscribe((value) => games = value);
          gameService.currentUserGames$.next(currentUserGamesMock);
          tick(500);
          expect(games.length).toBe(currentUserGamesMock.length);
      })));

      it('should return only one game when the full name is typed',
        fakeAsync(inject([GameService], (gameService: GameServiceMock) => {
          let games: any = 'Its a-me, Mario!';
          component.games$.subscribe((value) => games = value);
          gameService.currentUserGames$.next(currentUserGamesMock);
          component.form.controls.search.setValue(targetGame.name);
          tick(500);
          expect(games.length).toBe(1);
      })));

      it('should return sorted',
        fakeAsync(inject([GameService], (gameService: GameServiceMock) => {
          let games: any = 'Its a-me, Mario!';
          component.games$.subscribe((value) => games = value);
          gameService.currentUserGames$.next(currentUserGamesMock);
          tick(500);
          const sortedGames = currentUserGamesMock.sort((a, b) => (a.name > b.name) ? 1 : -1);
          expect(games).toBe(sortedGames);
      })));
    });

  });
});

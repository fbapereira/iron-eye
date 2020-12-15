import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxNotifierService } from 'ngx-notifier';
import { BehaviorSubject, of } from 'rxjs';

import { GameServiceMock, currentUserGamesMock, targetGame } from '../../testing/game-service.mock'
import { NgxNotifierServiceMock } from '../../testing/notifier-service.mock';
import { YoutubeServiceMock } from '../../testing/youtube-service.mock';
import { GameService } from '../game.service';
import { YoutubeService } from '../youtube.service';

import { GameComponent } from './game.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{ path: 'games', redirectTo: '' }]),
      ],
      declarations: [
        GameComponent,
      ],
      providers: [
        {
          provide: GameService,
          useClass: GameServiceMock,
        },
        {
          provide: NgxNotifierService,
          useClass: NgxNotifierServiceMock,
        },
        {
          provide: YoutubeService,
          useClass: YoutubeServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: new BehaviorSubject<Params>({id: targetGame.gameId}),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('game$', () => {
    describe('when game id does not match', () => {
      beforeEach(inject([ActivatedRoute], (activatedRoute: ActivatedRoute) => {
        ((activatedRoute.queryParams) as BehaviorSubject<Params>).next({ id: 99 } as Params);
      }));

      it('should emit a message',
        inject([NgxNotifierService, GameService], (ngxNotifierService: NgxNotifierService, gameService: GameServiceMock) => {
          spyOn(ngxNotifierService, 'createToast');
          gameService.currentUserGames$.next(currentUserGamesMock);
          component.game$.subscribe();
          expect(ngxNotifierService.createToast).toHaveBeenCalledWith('Game not found');
      }));

      it('should navigate to games',
        inject([Router, GameService], (router: Router, gameService: GameServiceMock) => {
          spyOn(router, 'navigate');
          gameService.currentUserGames$.next(currentUserGamesMock);
          component.game$.subscribe();
          expect(router.navigate).toHaveBeenCalledWith(['/games']);
      }));
    });

    describe('when game id does match', () => {
      it('should not emit a message',
        inject([NgxNotifierService, GameService], (ngxNotifierService: NgxNotifierService, gameService: GameServiceMock) => {
          spyOn(ngxNotifierService, 'createToast');
          gameService.currentUserGames$.next(currentUserGamesMock);
          component.game$.subscribe();
          expect(ngxNotifierService.createToast).not.toHaveBeenCalled();
      }));

      it('should navigate to games',
        inject([Router, GameService], (router: Router, gameService: GameServiceMock) => {
          spyOn(router, 'navigate');
          component.game$.subscribe();
          gameService.currentUserGames$.next(currentUserGamesMock);
          expect(router.navigate).not.toHaveBeenCalled();
      }));

      it('should emit the game',
        inject([Router, GameService], (router: Router, gameService: GameServiceMock) => {
          spyOn(router, 'navigate');
          let game: any = `You were almost a Jill sandwich!`;
          component.game$.subscribe((value) => game = value);
          gameService.currentUserGames$.next(currentUserGamesMock);
          const selectedGame = currentUserGamesMock.find((value) => value.gameId === Number(targetGame.gameId));
          expect(game).toBe(selectedGame);
      }));
    });
  });

  describe('videoUrl$', () => {
    it('should call the service with the game',
      inject([YoutubeService, Router, GameService], (youtubeService: YoutubeService, router: Router, gameService: GameServiceMock) => {
        spyOn(youtubeService, 'getVideo').and.returnValue(of(''));
        component.videoUrl$.subscribe();
        gameService.currentUserGames$.next(currentUserGamesMock);
        expect(youtubeService.getVideo).toHaveBeenCalledWith(targetGame);
    }));
  });
});

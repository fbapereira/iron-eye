import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgxNotifierService } from 'ngx-notifier';

import { AuthService } from '../shared/auth.service';
import { AuthServiceMock } from '../testing/auth-service.mock';
import { NgxNotifierServiceMock } from '../testing/notifier-service.mock';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: AuthServiceMock,
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock,
        },
        {
          provide: NgxNotifierService,
          useClass: NgxNotifierServiceMock,
        },
      ],
    });
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

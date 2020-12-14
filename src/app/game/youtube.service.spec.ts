import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthServiceMock } from '../testing/auth-service.mock';

import { YoutubeService } from './youtube.service';

describe('YoutubeService', () => {
  let service: YoutubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: AuthServiceMock,
        },
      ],
    });
    service = TestBed.inject(YoutubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Game } from './game.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
  ) {
  }

  getVideo(game: Game): Observable<SafeUrl> {
    return this.http.get(`https://youtube.googleapis.com/youtube/v3/search?key=${ environment.youtubeKey }&q=${ game.name } official trailer`)
    .pipe(
      map((youtubeObj: any) => youtubeObj?.items[0]?.id?.videoId),
      map((videoId: string) => this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`))
    );
  }
}
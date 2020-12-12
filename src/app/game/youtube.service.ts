import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Game } from './game.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    return this.http.get('https://youtube.googleapis.com/youtube/v3/search?key=AIzaSyDie5PXIotY5LdkvJgQpvir6sbcJzEyTO0&q=' + game.name + 'official trailer').pipe(
      map((youtubeObj: any) => youtubeObj?.items[0]?.id?.videoId),
      map((videoId: string) => this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`))
    );
  }
}
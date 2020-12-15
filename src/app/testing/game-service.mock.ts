import { Subject } from 'rxjs';

import { Game } from '../game/game.model';

export class GameServiceMock {
  public currentUserGames$ = new Subject<Game[]>();
}

export const targetGame = {
  "gameId": 1,
  "name": "Tom Clancy's Rainbow Six® Siege",
  "thumbnail": "https://ubistatic3-a.akamaihd.net/orbit/uplay_launcher_3_0/assets/ce92dd05207a67d81bb6a3df7bf004c3.jpg",
  "ageRestriction": 16
} as Game;

export const currentUserGamesMock = [{
  "gameId": 1,
  "name": "Tom Clancy's Rainbow Six® Siege",
  "thumbnail": "https://ubistatic3-a.akamaihd.net/orbit/uplay_launcher_3_0/assets/ce92dd05207a67d81bb6a3df7bf004c3.jpg",
  "ageRestriction": 16
},
{
  "gameId": 2,
  "name": "Assassin's Creed® Syndicate",
  "thumbnail": "https://ubistatic3-a.akamaihd.net/orbit/uplay_launcher_3_0/assets/c698e01ad67770b33af230f93d8f5753.jpg",
  "ageRestriction": 14
},
{
  "gameId": 3,
  "name": "The Crew",
  "thumbnail": "https://ubistatic3-a.akamaihd.net/orbit/uplay_launcher_3_0/assets/b33ab65fc6ca2c6bd7574b9449f3e6cc.jpg",
  "ageRestriction": 16
}] as Game[];
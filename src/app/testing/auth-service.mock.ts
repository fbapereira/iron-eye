import { Subject } from 'rxjs';

export class AuthServiceMock {
  public token: string;
  public isAuthenticated$ = new Subject<boolean>();
  public cleanToken() {
    this.token = null;
  }
}
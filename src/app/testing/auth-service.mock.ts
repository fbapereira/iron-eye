import { Subject } from 'rxjs';

export class AuthServiceMock {
  token: string;
  isAuthenticated$ = new Subject<boolean>();
  cleanToken() {
    this.token = null;
  }
}
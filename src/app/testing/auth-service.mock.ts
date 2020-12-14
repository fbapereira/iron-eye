import { Subject } from 'rxjs';

export class AuthServiceMock {
  isAuthenticated$ = new Subject<boolean>();
  cleanToken() { return }
}
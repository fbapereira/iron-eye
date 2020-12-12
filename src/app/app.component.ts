import { Component } from '@angular/core';

import { AuthService } from './shared/auth.service';
import { User } from './user/user.model';
import { UserService } from './user/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'iron-eyes';

  user$ = this.userService.currentUser$;

  constructor(
    private auth: AuthService,
    private userService: UserService) {

  }

  login() {
    this.auth.auth(
      {
        "emailAddress": "judith.kelly@ubisoft.com",
        "password": "qwerty"
      } as User
    ).subscribe();
  }

  // logout() {
  //   this.auth.logout();
  // }
}

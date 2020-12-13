import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  /**
   * current user object
   */
  public user$ = this.userService.currentUser$;

  /**
   * defined redeem component display
   */
  public showRedeemComponent = false;

  constructor(
    private auth: AuthService,
    private userService: UserService) {
  }

  /**
   * log out the user
   */
  public logout(): void {
    this.auth.cleanToken();
  }
}

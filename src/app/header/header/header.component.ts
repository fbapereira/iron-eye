import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user$ = this.userService.currentUser$;
  isAdmin$ = this.userService.isAdmin$;

  showRedeemField = false;
  constructor(
    private auth: AuthService,
    private userService: UserService) {
  }

  logout(): void {
    this.auth.cleanToken();
  }
}

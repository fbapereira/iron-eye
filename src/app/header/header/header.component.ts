import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { AuthService } from 'src/app/shared/auth.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user$ = this.userService.currentUser$;
  isAdmin$ = this.userService.isAdmin$.pipe(tap((a) => console.log(a)));

  constructor(
    private auth: AuthService,
    private userService: UserService) {
  }

  logout(): void {
    alert('as');
    this.auth.cleanToken();
  }
}

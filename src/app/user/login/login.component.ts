import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, first } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/auth.service';

import { User } from '../user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  /**
   * Login form
   */
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.createForm();
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.authService.auth(this.form.getRawValue() as User).pipe(
        first(),
        tap(() => this.router.navigate(['/'])),
      ).subscribe();
    }
  }

  private createForm(): void {
    this.form = this.fb.group({
      emailAddress: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}

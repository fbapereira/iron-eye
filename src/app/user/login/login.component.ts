import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    debugger;
    if (this.form.valid) {
      this.authService.auth(this.form.getRawValue() as User).pipe(
        tap(() => this.router.navigate(['/'])),
      ).subscribe();
    }
  }
}

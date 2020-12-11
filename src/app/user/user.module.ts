import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [LoginComponent, ProfileComponent, UserListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent]
})
export class UserModule { }

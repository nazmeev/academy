
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { 
  LoginComponent,
  LogoutComponent,
  SignupComponent
} from './components';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SignupComponent,
    ResetPasswordComponent,
    VerifyPasswordComponent,
    NewPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class UserModule { }

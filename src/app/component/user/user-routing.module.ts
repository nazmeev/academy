import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate } from '@angular/fire/auth-guard';
import { URL_ROUTES } from '../../model/url-routes';
import { redirectLoggedInToDashboard, redirectUnauthorizedToLogin } from '../../utils/fire-guard.utils';
import {
  LoginComponent,
  LogoutComponent,
  SignupComponent,
  ResetPasswordComponent,
  VerifyPasswordComponent,
  NewPasswordComponent
} from './components';

const routes: Routes = [
  {path: '', 
    redirectTo: URL_ROUTES.login,
    pathMatch: 'full'
  },
  { path: URL_ROUTES.signup, component: SignupComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: URL_ROUTES.login, component: LoginComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: URL_ROUTES.logout, component: LogoutComponent, ...canActivate(redirectUnauthorizedToLogin) },
  { path: URL_ROUTES.resetpassword, component: ResetPasswordComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: URL_ROUTES.verifypassword, component: VerifyPasswordComponent, ...canActivate(redirectLoggedInToDashboard) },
  { path: 'auth/action', component: VerifyPasswordComponent },
  { path: URL_ROUTES.newpassword, component: NewPasswordComponent, ...canActivate(redirectLoggedInToDashboard) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})
export class UserRoutingModule { }
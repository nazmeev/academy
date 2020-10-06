import { NgModule } from '@angular/core';
import { canActivate } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { redirectUnauthorizedToLogin } from '../../utils/fire-guard.utils';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, ...canActivate(redirectUnauthorizedToLogin) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})
export class DashboardRoutingModule { } 
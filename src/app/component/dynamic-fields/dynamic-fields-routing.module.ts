import {NgModule} from '@angular/core';
import { canActivate } from '@angular/fire/auth-guard';
import {RouterModule, Routes} from '@angular/router';
import { redirectUnauthorizedToLogin } from '../../utils/fire-guard.utils';
import {DynamicFieldsComponent} from './dynamic-fields.component';

const routes: Routes = [
  {path: '', component: DynamicFieldsComponent, ...canActivate(redirectUnauthorizedToLogin)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule]
})
export class DynamicFieldsRoutingModule {
}

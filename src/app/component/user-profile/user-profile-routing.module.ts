import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { redirectUnauthorizedToLogin } from '../../utils/fire-guard.utils';
import { canActivate } from '@angular/fire/auth-guard';

const routes: Routes = [
    {
        path : '',
        component: ProfileComponent,
        ...canActivate(redirectUnauthorizedToLogin)
    }
];

@NgModule({
    imports  : [RouterModule.forChild(routes)],
    providers: [],
    exports  : [RouterModule]
})
export class UserProfileRoutingModule {
}

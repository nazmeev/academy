import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './component/layout/layout/layout.component';
import { URL_ROUTES } from './model/url-routes';

const routes: Routes = [
    {
        path        : '',
        loadChildren: () => import('./component/user/user.module').then(m => m.UserModule)
    },
    {
        path        : URL_ROUTES.profile,
        component   : LayoutComponent,
        loadChildren: () => import('./component/user-profile/user-profile.module').then(m => m.UserProfileModule)
    },
    {
        path        : 'dash',
        component   : LayoutComponent,
        loadChildren:
            () => import('./component/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'fields',
        loadChildren: () => import('./component/dynamic-fields/dynamic-fields.module').then(m => m.DynamicFieldsModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

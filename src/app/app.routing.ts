import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },

      {
        path: 'beauty-tips',
        loadChildren: './views/beautytip/beautytip.module#BeautytipModule'
      },
      {
        path: 'activities',
        loadChildren: './views/activities/activities.module#ActivitiesModule'
      },
      {
        path: 'deals',
        loadChildren: './views/deals/deals.module#DealsModule'
      },
      {
        path: 'content',
        loadChildren: './views/content/content.module#ContentModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

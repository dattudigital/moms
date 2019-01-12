import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner.component';
import { UserComponent } from './user.component';
import { UserActivitiesComponent } from './user-activities.component';
import { AuthGuard } from '../../common-session/session.check'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        redirectTo: 'banners'
      },
      {
        path: 'banners',
        component: BannerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'users',
        component: UserComponent,      
        canActivate: [AuthGuard]
      },
      {
        path:"user-activities",
        component:UserActivitiesComponent,
        canActivate:[AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerUserActivityRoutingModule {}
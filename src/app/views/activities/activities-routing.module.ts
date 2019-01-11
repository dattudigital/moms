import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { AuthGuard } from '../../common-session/session.check'

const routes: Routes = [
  {
    path: '', component: ActivitiesComponent,
    data: {
      title: 'Faqs'
    },
    canActivate: [AuthGuard]
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule {}

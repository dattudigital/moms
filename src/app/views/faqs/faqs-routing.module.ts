import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqsComponent } from './faqs.component';
import { AuthGuard } from '../../common-session/session.check'

const routes: Routes = [
  {
    path: '', component: FaqsComponent,
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
export class FaqsRoutingModule {}

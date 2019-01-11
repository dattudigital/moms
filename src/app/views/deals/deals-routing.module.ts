import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealsComponent } from './deals.component';
import { AuthGuard } from '../../common-session/session.check'

const routes: Routes = [
  {
    path: '', component: DealsComponent,
    data: {
      title: 'Deals'
    },
    canActivate: [AuthGuard]
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DealsRoutingModule {}
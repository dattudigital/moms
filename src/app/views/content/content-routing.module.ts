import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentComponent } from './content.component';
import { AuthGuard } from '../../common-session/session.check'

const routes: Routes = [
  {
    path: '', component: ContentComponent,
    data: {
      title: 'Content'
    },
    canActivate: [AuthGuard]
  }
 ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule {}
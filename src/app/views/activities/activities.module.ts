import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivitiesComponent } from './activities.component';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {ToastyModule} from 'ng2-toasty';
import { AuthGuard } from '../../common-session/session.check'

@NgModule({
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TableModule,
    ToastyModule
  ],
  declarations: [ActivitiesComponent],
  providers:[AuthGuard]
})
export class ActivitiesModule { }
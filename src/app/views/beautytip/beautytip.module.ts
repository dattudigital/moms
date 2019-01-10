import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BeautyTipsComponent } from './beautytip.component';
import { BeautytipRoutingModule } from './beautytip-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToastyModule } from 'ng2-toasty';
import { AuthGuard } from '../../common-session/session.check'

@NgModule({
  imports: [
    CommonModule,
    BeautytipRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    AlertModule.forRoot(),
    ToastyModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    TableModule
  ],
  declarations: [BeautyTipsComponent],
  providers:[AuthGuard]
})
export class BeautytipModule { }
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { BannerComponent } from './banner.component';
import { UserComponent } from './user.component';
import { BannerUserActivityRoutingModule } from './banner-user-activities-routing.module';
import { UserActivitiesComponent } from './user-activities.component';
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
        BannerUserActivityRoutingModule,
        NgxSpinnerModule,
        ModalModule.forRoot(),
        AlertModule.forRoot(),
        FormsModule,
        NgxPaginationModule,
        ReactiveFormsModule,
        TableModule,
        ToastyModule
    ],
    declarations: [BannerComponent, UserComponent, UserActivitiesComponent],
    providers: [AuthGuard]
})
export class BannerUserActivitiesModule { }
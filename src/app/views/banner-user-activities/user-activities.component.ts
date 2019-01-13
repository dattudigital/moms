import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BeautyTipsService } from '../../services/beauty-tips.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { UsersService } from '../../services/users.service';
import { UserActivitiesService } from '../../services/user-activities.service';
@Component({
    templateUrl: 'user-activities.component.html'
})

export class UserActivitiesComponent implements OnInit {
    toastOptionsSuccess: ToastOptions = {
        title: "Success",
        msg: "Successfully Done",
        showClose: true,
        timeout: 3000,
        theme: 'default'
    };
    toastOptionsError: ToastOptions = {
        title: "Error",
        msg: "Something is Wrong",
        showClose: true,
        timeout: 3000,
        theme: 'default'
    };
    toastOptionsWarn: ToastOptions = {
        title: "Not Found",
        msg: "No Data",
        showClose: true,
        timeout: 3000,
        theme: 'default'
    };
    userActivitys: any = [];
    activitys: any;
    users: any;
    selectedUserId: any;
    selctedActivityId: any;
    startDate:any;
    endDate:any;
    constructor(private service: UsersService, private activitiyService: UserActivitiesService) {

    }

    ngOnInit() {
        this.service.getUserActivities('').subscribe(res => {
            if (res.json().status == true) {
                this.userActivitys = res.json().result
            }
        })

        this.activitiyService.getActivity().subscribe(res => {
            if (res.json().status == true) {
                this.activitys = res.json().result
            }
        })
        this.service.getUser().subscribe(res => {
            this.users = res.json()
        })
    }


    search(){
        var url = '';
        if (this.startDate) {
          url = url + 'startdate=' + this.startDate;
        }
        if (this.endDate) {
          url = url + '&enddate=' + this.endDate;
        }
        if (this.selectedUserId) {
          url = url + '&userid=' + this.selectedUserId;
        }
        if (this.selctedActivityId) {
          url = url + '&activityid=' + this.selctedActivityId;
        }
        this.service.getUserActivities(url).subscribe(res => {
            if (res.json().status == true) {
                this.userActivitys = res.json().result
            }
        })
    }

    reset(){
        this.selectedUserId = undefined;
        this.selctedActivityId = undefined;
        this.startDate = null;
        this.endDate = " ";
    }
}
import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BeautyTipsService } from '../../services/beauty-tips.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { UsersService } from '../../services/users.service';

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

    constructor(private service: UsersService) {

    }
    ngOnInit() {
        this.service.getUserActivities().subscribe(res => {
            console.log("***********")
            console.log(res.json())
            if (res.json().status == true) {
                this.userActivitys = res.json().result
            }
        })
    }
}
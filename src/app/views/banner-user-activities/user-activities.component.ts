import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BeautyTipsService } from '../../services/beauty-tips.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';

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

    banner: any = {
        'deal_id': null,
        'deal_name': '',
        'deal_short_desc': '',
        'deal_long_desc': '',
        'deal_type': '',
        'deal_image': '',
        'profile_name': '',
        'deal_status': ''
    }
    bannerForm: FormGroup;
    dealAdd: any = [];
    submitted = false;
    bannerData: any;
    copiedRow = '';
    isShowOriginalImg: boolean = false;
    deleteRecord: '';
    currentPage: any = 1;
    totalItems: number;
    userimagePreview: any;
    userImage: string;

    constructor() {

    }
    ngOnInit() {

    }
}
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UsersService } from '../../services/users.service';
import { UserActivitiesService } from '../../services/user-activities.service';
import { CompeleteMomsService } from '../../services/compelete-moms.service';
import { UserActivityPipe } from '../../pipe/user-activity.pipe';
import { ExcelServiceService } from '../../services/excel-service.service';
import { ToastyMessageService } from '../../services/toasty-message.service';

@Component({
    templateUrl: 'user-activities.component.html',
    providers: [
        UserActivityPipe,
        ToastyMessageService
    ]
})

export class UserActivitiesComponent implements OnInit {
    userActivitysData: any = [];
    activitys: any;
    users: any;
    selectedUserId: any;
    selctedActivityId: any;
    startDate: any;
    endDate: any;
    excelData: any = [];

    constructor(private service: UsersService, private toastMessage: ToastyMessageService, private excelService: ExcelServiceService, private userpipe: UserActivityPipe, private completeservice: CompeleteMomsService, private spinner: NgxSpinnerService, private activitiyService: UserActivitiesService) {
    }

    ngOnInit() {
        this.getUserActivities();
        let _activity = this.completeservice.getActivityData();
        if (Object.keys(_activity).length) {
            this.activitys = _activity
        } else {
            this.activitiyService.getActivity('0').subscribe(res => {
                if (res.json().status == true) {
                    this.activitys = res.json().result;
                    this.completeservice.addActivityData(res.json().result)
                }
            });
        }

        let _user = this.completeservice.getUsers();
        if (Object.keys(_user).length) {
            this.users = _user;
        } else {
            this.service.getUser('0').subscribe(res => {
                this.users = res.json();
                this.completeservice.addUserData(this.users);
            })
        }
    }

    getUserActivities() {
        let _activities = this.completeservice.getUserActivityData();
        if (Object.keys(_activities).length) {
            this.userActivitysData = _activities
        } else {
            this.spinner.show()
            this.service.getUserActivities('').subscribe(res => {
                this.spinner.hide();
                if (res.json().status == true) {
                    this.userActivitysData = this.userpipe.transform(res.json().result);
                    console.log(this.userActivitysData)
                    this.completeservice.addUserActivityData(res.json().result)
                }
            })
        }
    }

    search() {
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
        console.log(url)
        this.spinner.show();
        this.service.getUserActivities(url).subscribe(res => {
            this.spinner.hide();
            if (res.json().status == true) {
                this.userActivitysData = this.userpipe.transform(res.json().result)
            } else {
                this.userActivitysData = [];
                this.toastMessage.errorToast("No Records Found");
            }
        })
    }

    reset() {
        this.selectedUserId = undefined;
        this.selctedActivityId = undefined;
        this.startDate = null;
        this.endDate = null;
        this.getUserActivities();
        this.toastMessage.successToast("Reset Applied Successfully");

    }

    exportAsXLSX() {
        this.excelService.exportAsExcelFile(this.userActivitysData, 'Useractivity');

        // this.service.getUserActivities('').subscribe(res => {
        //     if (res.json().status == true) {
        //         console.log(res.json().result)
        //         this.excelData = this.userpipe.transform(res.json().result);;
        //         console.log(this.excelData)
        //     }
        // })
    }
}
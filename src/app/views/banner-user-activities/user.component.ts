import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { UsersService } from '../../services/users.service'
import { CompeleteMomsService } from '../../services/compelete-moms.service';

@Component({
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
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

    usersData: any = [];
    deleteRecord: '';
    currentPage: any = 1;

    constructor(private spinner: NgxSpinnerService, private completeservice: CompeleteMomsService, private cdr: ChangeDetectorRef, private service: UsersService, private toastyService: ToastyService, private formBuilder: FormBuilder) {
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnInit() {
        let _user = this.completeservice.getUserData();
        if (Object.keys(_user).length) {
            this.usersData = _user
        } else {
            this.spinner.show()
            this.service.getUser().subscribe(res => {
                this.spinner.hide();
                this.usersData = res.json();
                this.completeservice.addUserData(res.json())
            });
        }
    }

    deleteUsers(data, index) {
        this.deleteRecord = data;
        this.deleteRecord["index"] = index
    }

    deleteUserData() {
        let _userData: any =[]
        this.service.saveUser({ user_id: this.deleteRecord["user_id"], status: 0 }).subscribe(res => {
            if (res.json().status == true) {
                let _index = ((this.currentPage - 1) * 3) + this.deleteRecord["index"]
                this.usersData.splice(_index, 1);
                this.completeservice.addUserData(_userData)
                this.toastyService.success(this.toastOptionsSuccess);
            } else {
                this.toastyService.error(this.toastOptionsError);
            }
        });
    }

}
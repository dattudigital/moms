import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder } from '@angular/forms';
import { ToastyMessageService } from '../../services/toasty-message.service';
import { UsersService } from '../../services/users.service'
import { CompeleteMomsService } from '../../services/compelete-moms.service';

@Component({
    templateUrl: 'user.component.html',
    providers: [ToastyMessageService]
})

export class UserComponent implements OnInit {
    usersData: any = [];
    deleteRecord: '';
    currentPage: any = 1;

    constructor(private spinner: NgxSpinnerService, private toastMessage: ToastyMessageService, private completeservice: CompeleteMomsService, private cdr: ChangeDetectorRef, private service: UsersService, private formBuilder: FormBuilder) {
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
        this.service.saveUser({ user_id: this.deleteRecord["user_id"], status: 0 }).subscribe(res => {
            if (res.json().status == true) {
                let _index = ((this.currentPage - 1) * 3) + this.deleteRecord["index"]
                this.usersData.splice(_index, 1);
                this.completeservice.addUserData([])
                this.toastMessage.successToast("User Deleted Successfully");
            } else {
                this.toastMessage.errorToast('user not deleted')
            }
        });
    }

}
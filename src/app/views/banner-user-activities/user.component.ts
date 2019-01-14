import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { UsersService } from '../../services/users.service'

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

    users: any = [];
    userForm: FormGroup;
    submitted = false;
    copiedRow = '';
    isShowOriginalImg: boolean = false;
    deleteRecord: '';
    currentPage: any = 1;
    userimagePreview: any;
    userImage: string;
    user: any = {
        'user_id': null,
        'fname': '',
        'lname': '',
        'dob': '',
        'age': '',
        'profile_image': '',
        'city': '',
        'mobile': '',
        'email': '',
        'status': ''
    }

    constructor(private spinner: NgxSpinnerService, private service: UsersService, private toastyService: ToastyService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.spinner.show()
        this.service.getUser().subscribe(res => {
            this.spinner.hide();
            this.users = res.json();
        });

        this.userForm = this.formBuilder.group({
            fname: ['', Validators.required],
            lname: ['', Validators.required],
            dob: ['', Validators.required],
            mobile: ['', Validators.required],
            email: ['', Validators.required]
        });
    }

    get f() { return this.userForm.controls; }

    updateUsers() {
        this.submitted = true;
        if (this.userForm.invalid) {
            return;
        }
        var data = {
            user_id: this.user.user_id,
            fname: this.user.fname,
            lname: this.user.lname,
            dob: this.user.dob,
            gender: this.user.gender,
            profile_image: this.user.profile_image,
            email: this.user.email,
            mobile: this.user.mobile,
            status: this.user.status
        }
        console.log(data);
        return;
        let modelClose = document.getElementById("CloseButton");
        this.service.saveUser(data).subscribe(res => {
            modelClose.click();
            if (res.json().status == true) {
                let _index = ((this.currentPage - 1) * 3) + this.user["index"]
                console.log(_index)
                if (this.user.deal_status == '0') {
                    this.users.splice(_index, 1);
                } else {
                    this.users[_index] = res.json().result;
                }
                this.toastyService.success(this.toastOptionsSuccess);
            } else {
                this.toastyService.error(this.toastOptionsError);
            }
        })
    }

    editUser(data, index) {
        this.copiedRow = Object.assign({}, data);
        this.user = data;
        console.log(this.user)
        this.user["index"] = index;
    }

    backupData() {
        console.log('@@@@')
        let _index = ((this.currentPage - 1) * 3) + this.user["index"]
        console.log(_index);
        this.users[_index] = this.copiedRow;
    }

    deleteUsers(data, index) {
        this.deleteRecord = data;
        this.deleteRecord["index"] = index
    }

    getFileDetails(event) {
        var files = event.target.files;
        var file = files[0];
        if (files && file) {
            var reader = new FileReader();
            reader.onload = this._handleReaderLoaded.bind(this);
            reader.readAsBinaryString(file);
        }
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            this.user.profile_name = file.name;
            reader.onload = (event) => {
                this.userimagePreview = event.target;
            }
        }
    }

    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.user.profile_image = btoa(binaryString);
        this.isShowOriginalImg = true;
        if (this.user.user_id) {
            this.isShowOriginalImg = true;
        }
    }

}
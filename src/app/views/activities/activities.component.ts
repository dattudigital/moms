import { Component, ChangeDetectorRef, OnInit, ɵConsole, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserActivitiesService } from '../../services/user-activities.service';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { Http } from '@angular/http';
import { environment } from '../../../environments/environment'

@Component({
  templateUrl: 'activities.component.html',
})

export class ActivitiesComponent implements OnInit {
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

  userActivity: any;
  copiedRow: any;
  activityForm: FormGroup;
  activities: any = {
    'activity_id': null,
    'activity_name': '',
    'activity_type': '',
    'activity_desc': '',
    'activity_status': ''
  }
  submitted = false;
  cols: any = [];
  deleteRecord = '';

  constructor(private http: Http, private activityService: UserActivitiesService, private spinner: NgxSpinnerService, private toastyService: ToastyService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {

    this.activityService.getActivity().subscribe(response => {
      if (response.json().status == true) {
        this.userActivity = response.json().result;
        console.log(this.userActivity)
      } else {
        this.userActivity = [];
      }
    });

    this.cols = [
      { field: 'activity_name', header: 'Name' },
      { field: 'activity_type', header: 'Type' },
      { field: 'activity_desc', header: 'Description' },
    ]
    this.activityForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Type: ['', Validators.required],
      Description: ['', Validators.required]

    });
  }


  removeFields() {
    this.submitted = false;
    this.activities.activity_id = '';
    this.activities.activity_name = '';
    this.activities.activity_type = '';
    this.activities.activity_desc = '';
  }
  get f() { return this.activityForm.controls; }


  addUserActivity() {
    this.submitted = true;
    if (this.activityForm.invalid) {
      return;
    }
    if (!this.activities.activity_id) {
      this.activities.activity_status = '1'
    }
    if (!this.activities.activity_id) {
      this.activities.activity_id = null;
    }
    var data = {
      activity_id: this.activities.activity_id,
      activity_name: this.activities.activity_name,
      activity_type: this.activities.activity_type,
      activity_desc: this.activities.activity_desc,
      activity_status: this.activities.activity_status
    }
    let modelClose = document.getElementById("CloseButton");
    this.activityService.saveActivitiesDetails(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        if (!this.activities.activity_id) {
          this.userActivity.push(res.json().result)
        } else {
          if (this.activities.activity_status == '0') {
            this.userActivity.splice(this.activities["index"], 1);
          } else {
            this.userActivity[this.activities["index"]] = res.json().result;
          }
        }
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }

  editUserActivity(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.activities = data;
    this.activities["index"] = index;
  }

  backupData() {
    let _index = this.activities["index"];
    this.userActivity[_index] = this.copiedRow;
  }

  deleteUserActivity(val, index) {
    console.log(val)
    this.deleteRecord = val;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.activityService.saveActivitiesDetails({ activity_id: this.deleteRecord["activity_id"], activity_status: 0 }).subscribe(res => {
      if (res.json().status == true) {
        this.userActivity.splice(this.deleteRecord["index"], 1);
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }


}

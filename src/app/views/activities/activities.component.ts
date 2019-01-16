import { Component, ChangeDetectorRef, OnInit, ɵConsole, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserActivitiesService } from '../../services/user-activities.service';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyMessageService } from '../../services/toasty-message.service';
import { Http } from '@angular/http';
import { CompeleteMomsService } from '../../services/compelete-moms.service';

@Component({
  templateUrl: 'activities.component.html',
  providers:[ToastyMessageService]
})

export class ActivitiesComponent implements OnInit {
  activitys: any;
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
  completeData: any = [];
  currentPage: any = 1;


  constructor(private http: Http, private toastMessage: ToastyMessageService, private completeservice: CompeleteMomsService, private activityService: UserActivitiesService, private spinner: NgxSpinnerService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder) { }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {

    let _activity = this.completeservice.getActivityData();
    if (Object.keys(_activity).length) {
      this.activitys = _activity
    } else {
      this.activityService.getActivity().subscribe(res => {
        if (res.json().status == true) {
          this.activitys = res.json().result;
          this.completeservice.addActivityData(res.json().result)
        }
      });
    }

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
          this.activitys.push(res.json().result)
          this.completeservice.addActivityData(res.json().result);
          this.toastMessage.successToast("Activity Added Successfully");
        } else {
          let _index = ((this.currentPage - 1) * 3) + this.activities["index"]
          if (this.activities.activity_status == '0') {
            this.activitys.splice(_index, 1);
            this.completeservice.addActivityData(this.completeData);
            this.toastMessage.successToast("Activity inactive Successfully");
          } else {
            this.activitys[_index] = res.json().result;
            this.completeservice.addActivityData(res.json().result);
            this.toastMessage.successToast("Activity updated Successfully");
          }
        }
      } else {
        this.toastMessage.errorToast('Activity not Added')
      }
    });
  }

  editUserActivity(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.activities = data;
    this.activities["index"] = index;
  }

  backupData() {
    let _index = ((this.currentPage - 1) * 3) + this.activities["index"]
    this.activitys[_index] = this.copiedRow;
  }

  deleteUserActivities(val, index) {
    this.deleteRecord = val;
    this.deleteRecord["index"] = index
  }

  deleteActivities() {
    this.activityService.saveActivitiesDetails({ activity_id: this.deleteRecord["activity_id"], activity_status: 0 }).subscribe(res => {
      if (res.json().status == true) {
        let _index = ((this.currentPage - 1) * 3) + this.deleteRecord["index"]
        this.activitys.splice(_index, 1);
        this.completeservice.addActivityData(this.completeData)
        this.toastMessage.successToast("Activity Deleted Successfully");
      } else {
        this.toastMessage.errorToast('Activity not deleted')
      }
    });
  }

}

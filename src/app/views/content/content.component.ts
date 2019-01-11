import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../../services/content.service';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html'
})
export class ContentComponent implements OnInit {

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

  beautytips: any = {
    'tip_id': null,
    'tip_title': '',
    'tip_description': '',
    'tip_img': '',
    'tip_video': '',
    'tip_type': '',
    'profile_name': '',
    'rec_status': ''
  }
  beautyForm: FormGroup;
  submitted = false;
  ContentData: any;
  copiedRow = '';
  isShowOriginalImg: boolean = false;
  deleteRecord: '';
  currentPage: any = 1;
  totalItems: number;
  userimagePreview: any;
  userImage: string;

  constructor(private spinner: NgxSpinnerService, private service: ContentService, private cdr: ChangeDetectorRef, private toastyService: ToastyService, private formBuilder: FormBuilder) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.service.listContentDetails().subscribe(response => {

      if (response.json().status == true) {
        this.ContentData = response.json().result;
      } else {
        this.ContentData = [];
      }
    });
  }

}

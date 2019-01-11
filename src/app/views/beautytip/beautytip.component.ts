import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { BeautyTipsService } from '../../services/beauty-tips.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import{BeautyTipPipe} from '../../pipe/beauty-tip.pipe';
@Component({
  templateUrl: 'beautytip.component.html',
  providers: [
    BeautyTipPipe
  ]
})

export class BeautyTipsComponent implements OnInit {
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
  tipsData: any;
  copiedRow = '';
  isShowOriginalImg: boolean = false;
  deleteRecord: '';
  currentPage: any = 1;
  totalItems: number;
  userimagePreview: any;
  userImage: string;

  constructor(private spinner: NgxSpinnerService,private beautyTipPipe:BeautyTipPipe, private cdr: ChangeDetectorRef, private toastyService: ToastyService, private formBuilder: FormBuilder, private service: BeautyTipsService) { }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
  
    this.service.getBeautyTipsList().subscribe(response => {
 
      if (response.json().status == true) {
        this.tipsData = this.beautyTipPipe.transform(response.json().data);
      } else {
        this.tipsData = [];
      }
    });

    this.beautyForm = this.formBuilder.group({
      tipName: ['', Validators.required],
      description: ['', Validators.required],
      videoUrl: ['', Validators.required],
      tipType: ['', Validators.required]
    });
  }

  get f() { return this.beautyForm.controls; }

  addOrUpdateBeautyTips() {
    this.submitted = true;
    if (this.beautyForm.invalid) {
      return;
    }

    if (!this.beautytips.rec_status) {
      this.beautytips.rec_status = '1'
    }
    if (!this.beautytips.tip_id) {
      this.beautytips.tip_id = null;
    }
    var data = {
      tip_id: this.beautytips.tip_id,
      tip_title: this.beautytips.tip_title,
      tip_description: this.beautytips.tip_description,
      tip_img: this.beautytips.tip_img,
      tip_category: 1,
      profile_name: this.beautytips.profile_name,
      tip_video: this.beautytips.tip_video,
      tip_type: this.beautytips.tip_type,
      rec_status: this.beautytips.rec_status
    }
    console.log(data);
    let modelClose = document.getElementById("CloseButton");
   
    this.service.AddOrEditBeautyTip(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        if (!this.beautytips.tip_id) {
          this.tipsData.push(res.json().data)
        } else {
          let _index = ((this.currentPage - 1) * 3) + this.beautytips["index"]
          console.log(_index)
          if (this.beautytips.rec_status == '0') {
            this.tipsData.splice(_index, 1);
          } else {
            this.tipsData[_index] = res.json().data;
          }
        }
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    })
  }

  editBeautyTip(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.beautytips = data;
    this.beautytips["index"] = index;
  }

  backupData() {
    let _index = this.beautytips["index"];
    this.tipsData[_index] = this.copiedRow;
  }

  deleteBeautyTips(data, index) {
    this.deleteRecord = data;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {

    this.service.AddOrEditBeautyTip({ tip_id: this.deleteRecord["tip_id"], rec_status: 0 }).subscribe(res => {

      if (res.json().status == true) {
        let _index = ((this.currentPage - 1) * 3) + this.deleteRecord["index"]
        this.tipsData.splice(_index, 1);
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
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
      this.beautytips.profile_name = file.name;
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.beautytips.tip_img = btoa(binaryString);
    this.isShowOriginalImg = true;
    if (this.beautytips.tip_id) {
      this.isShowOriginalImg = true;
    }
  }
  removeFields() {
    this.beautytips.tip_id = '';
    this.beautytips.tip_title = '';
    this.beautytips.tip_description = '';
    this.beautytips.tip_img = '';
    this.beautytips.tip_video = '';
    this.beautytips.rec_status = '';
  }
}

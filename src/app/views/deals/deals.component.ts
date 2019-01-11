import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals.service'
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { environment } from '../../../environments/environment'
import { Http } from '@angular/http';
import * as moment from 'moment';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
})
export class DealsComponent implements OnInit {
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

  deals: any = {
    'deal_id': null,
    'deal_name': '',
    'deal_short_desc': '',
    'deal_long_desc': '',
    'deal_type': '',
    'deal_image': '',
    'profile_name': '',
    'deal_status': ''

  }
  dealsForm: FormGroup;
  dealAdd: any = [];
  submitted = false;
  dealsData: any;
  copiedRow = '';
  isShowOriginalImg: boolean = false;
  deleteRecord: '';
  currentPage: any = 1;
  totalItems: number;
  userimagePreview: any;
  userImage: string;

  constructor(private spinner: NgxSpinnerService, private http: Http, private service: DealsService, private cdr: ChangeDetectorRef, private toastyService: ToastyService, private formBuilder: FormBuilder) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.service.listDealDetails().subscribe(response => {
      if (response.json().status == true) {
        this.dealsData = response.json().result;
        console.log(this.dealsData)
      } else {
        this.dealsData = [];
      }
    });
    this.http.get(environment.host + 'content-categorys').subscribe(data => {
      console.log(data.json())
      this.dealAdd = data.json().result;
    });

    this.dealsForm = this.formBuilder.group({
      Name: ['', Validators.required],
      shortDescription: ['', Validators.required],
      Type: ['', Validators.required]
    });
  }
  removeFields() {
    this.deals.deal_id = '';
    this.deals.deal_name = '';
    this.deals.deal_short_desc = '';
    this.deals.deal_long_desc = '';
    this.deals.deal_type = '';
    this.deals.deal_image = '';
    this.deals.deal_status = '';
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
      this.deals.profile_name = file.name;
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.deals.deal_image = btoa(binaryString);
    this.isShowOriginalImg = true;
    if (this.deals.deal_id) {
      this.isShowOriginalImg = true;
    }
  }

  get f() { return this.dealsForm.controls; }

  addOrUpdateDeal() {
    this.submitted = true;
    if (this.dealsForm.invalid) {
      return;
    }

    if (!this.deals.deal_status) {
      this.deals.deal_status = '1'
    }
    if (!this.deals.deal_id) {
      this.deals.deal_id = null;
    }
    var data = {
      deal_id: this.deals.deal_id,
      deal_name: this.deals.deal_name,
      deal_short_desc: this.deals.deal_short_desc,
      deal_long_desc: this.deals.deal_long_desc,
      deal_type: this.deals.deal_type,
      profile_name: this.deals.profile_name,
      deal_image: this.deals.deal_image,
      deal_status: this.deals.deal_status
    }
    console.log(data);
    let modelClose = document.getElementById("CloseButton");
    this.service.saveDealDetails(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        if (!this.deals.deal_id) {
          this.dealsData.push(res.json().result)
        } else {
          let _index = ((this.currentPage - 1) * 3) + this.deals["index"]
          console.log(_index)
          if (this.deals.deal_status == '0') {
            this.dealsData.splice(_index, 1);
          } else {
            this.dealsData[_index] = res.json().result;
          }
        }
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    })
  }

  editDeal(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.deals = data;
    console.log(this.deals)
    this.deals["index"] = index;
  }


  backupData() {
    console.log('@@@@')
    let _index = ((this.currentPage - 1) * 3) + this.deals["index"]
    console.log(_index);
    this.dealsData[_index] = this.copiedRow;
  }

  deleteDeal(data, index) {
    this.deleteRecord = data;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {

    this.service.saveDealDetails({ deal_id: this.deleteRecord["deal_id"], deal_status: 0 }).subscribe(res => {

      if (res.json().status == true) {
        let _index = ((this.currentPage - 1) * 3) + this.deleteRecord["index"]
        this.dealsData.splice(_index, 1);
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }

}

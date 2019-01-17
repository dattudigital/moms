import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { DealsService } from '../../services/deals.service'
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyMessageService } from '../../services/toasty-message.service';
import { environment } from '../../../environments/environment'
import { Http } from '@angular/http';
import { CompeleteMomsService } from '../../services/compelete-moms.service';

@Component({
  selector: 'app-deals',
  templateUrl: './deals.component.html',
  providers:[ToastyMessageService]
})
export class DealsComponent implements OnInit {
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
  dealTypeData: any = [];
  submitted = false;
  dealsData: any;
  copiedRow = '';
  isShowOriginalImg: boolean = false;
  deleteRecord: '';
  currentPage: any = 1;
  totalItems: number;
  userimagePreview: any;
  userImage: string;
  completeData: any = [];

  constructor(private spinner: NgxSpinnerService, private toastMessage: ToastyMessageService, private http: Http, private service: DealsService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private completeservice: CompeleteMomsService) { }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    let _deals = this.completeservice.getDealsData();
    if (Object.keys(_deals).length) {
      this.dealsData = _deals
    } else {
      this.spinner.show();
      this.service.listDealDetails().subscribe(response => {
        if (response.json().status == true) {
          this.spinner.hide();
          this.dealsData = response.json().result;
          this.completeservice.addDealsData(response.json().result)
        } else {
          this.dealsData = [];
        }
      });
    }

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

  getDealsType() {
    let _dealtype = this.completeservice.getDealType();
    if (Object.keys(_dealtype).length) {
      this.dealTypeData = _dealtype
    } else {
      this.spinner.show();
      this.http.get(environment.host + 'content-categorys').subscribe(response => {
        this.spinner.hide();
        if (response.json().status == true) {
          this.dealTypeData = response.json().result;
          this.completeservice.addDealType(response.json().result)
        } else {
          this.dealsData = [];
        }
      });
    }
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
    let modelClose = document.getElementById("CloseButton");
    this.service.saveDealDetails(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        if (!this.deals.deal_id) {
          this.dealsData.push(res.json().result)
          this.completeservice.addDealsData(res.json().result)
          this.toastMessage.successToast("Deals Added Successfully");
        } else {
          let _index = ((this.currentPage - 1) * 3) + this.deals["index"]
          if (this.deals.deal_status == '0') {
            this.dealsData.splice(_index, 1);
            this.completeservice.addDealsData(this.completeData)
            this.toastMessage.successToast("Deals inactive Successfully");
          } else {
            this.dealsData[_index] = res.json().result;
            this.completeservice.addDealsData(res.json().result)
            this.toastMessage.successToast("Deals updated Successfully");
          }
        }
      } else {
        this.toastMessage.errorToast('Deals not Added')
      }
    })
  }

  editDeal(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.deals = data;
    this.deals["index"] = index;
  }

  backupData() {
    let _index = ((this.currentPage - 1) * 3) + this.deals["index"]
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
        this.completeservice.addDealsData(this.completeData)
        this.toastMessage.successToast("Deals  Deleted Successfully");
      } else {
        this.toastMessage.errorToast('Deals not deleted')
      }
    });
  }

}

import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContentService } from '../../services/content.service';
declare var $: any;
import { ToastyMessageService } from '../../services/toasty-message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompeleteMomsService } from '../../services/compelete-moms.service';
import { ExcelServiceService } from '../../services/excel-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  providers: [ToastyMessageService]
})
export class ContentComponent implements OnInit {

  content: any = {
    'content_id': null,
    'content_name': '',
    'content_full_desc': '',
    'content_short_desc': '',
    'content_price': '',
    'content_image': '',
    'profile_name': '',
    'content_status': ''
  }
  contentForm: FormGroup;
  submitted = false;
  ContentData: any;
  copiedRow = '';
  isShowOriginalImg: boolean = false;
  deleteRecord: '';
  currentPage: any = 1;
  userimagePreview: any;
  userImage: string;
  completeData: any = [];
  excelData: any = [];

  constructor(private spinner: NgxSpinnerService, private excelService: ExcelServiceService, private completeservice: CompeleteMomsService, private service: ContentService, private cdr: ChangeDetectorRef, private toastMessage: ToastyMessageService, private formBuilder: FormBuilder) {
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    let _content = this.completeservice.getContentData();
    if (Object.keys(_content).length) {
      this.ContentData = _content
    } else {
      this.spinner.show();
      this.service.listContentDetails('0').subscribe(response => {
        this.spinner.hide();
        if (response.json().status == true) {
          this.ContentData = response.json().result;
          this.completeservice.addContentData(response.json().result)
        } else {
          this.ContentData = [];
        }
      });
    }

    this.contentForm = this.formBuilder.group({
      Name: ['', Validators.required],
      lonDes: ['', Validators.required],
      shortDes: ['', Validators.required],
      Price: ['', Validators.required]
    });
  }

  removeFields() {
    this.content.content_id = '';
    this.content.content_name = '';
    this.content.content_full_desc = '';
    this.content.content_short_desc = '';
    this.content.content_price = '';
    this.content.content_image = '';
    this.content.profile_name = '';
    this.content.content_status = '';
  }

  get f() { return this.contentForm.controls; }

  addOrUpdateContents() {
    this.submitted = true;
    if (this.contentForm.invalid) {
      return;
    }

    if (!this.content.content_status) {
      this.content.content_status = '1'
    }
    if (!this.content.content_id) {
      this.content.content_id = null;
    }
    var data = {
      content_id: this.content.content_id,
      content_name: this.content.content_name,
      content_full_desc: this.content.content_full_desc,
      content_short_desc: this.content.content_short_desc,
      content_price: this.content.content_price,
      profile_name: this.content.profile_name,
      content_image: this.content.content_image,
      content_status: this.content.content_status
    }
    let modelClose = document.getElementById("CloseButton");
    this.service.saveContentDetails(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        if (!this.content.content_id) {
          this.ContentData.push(res.json().result)
          this.completeservice.addContentData(res.json().result)
          this.toastMessage.successToast("Content Added Successfully");
        } else {
          let _index = ((this.currentPage - 1) * 3) + this.content["index"]
          if (this.content.content_status == '0') {
            this.ContentData.splice(_index, 1);
            this.completeservice.addContentData(this.completeData)
            this.toastMessage.successToast("Content inactive Successfully");
          } else {
            this.ContentData[_index] = res.json().result;
            this.completeservice.addContentData(res.json().result)
            this.toastMessage.successToast("Content updated Successfully");
          }
        }
      } else {
        this.toastMessage.errorToast('Content not Added')
      }
    })
  }

  editContent(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.content = data;
    this.content["index"] = index;
  }

  longContent: '';
  DisplayContentData(data, index) {
    this.longContent = data.content_full_desc
  }


  backupData() {
    let _index = ((this.currentPage - 1) * 3) + this.content["index"]
    this.ContentData[_index] = this.copiedRow;
  }

  deleteContent(data, index) {
    this.deleteRecord = data;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.service.saveContentDetails({ content_id: this.deleteRecord["content_id"], content_status: 0 }).subscribe(res => {
      if (res.json().status == true) {
        let _index = ((this.currentPage - 1) * 3) + this.deleteRecord["index"]
        this.ContentData.splice(_index, 1);
        this.completeservice.addContentData(this.completeData)
        this.toastMessage.successToast("Content  Deleted Successfully");
      } else {
        this.toastMessage.errorToast('Activity not deleted')
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
      this.content.profile_name = file.name;
      reader.onload = (event) => {
        this.userimagePreview = event.target;
      }
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.content.content_image = btoa(binaryString);
    this.isShowOriginalImg = true;
    if (this.content.content_id) {
      this.isShowOriginalImg = true;
    }
  }

  exportAsXLSX(): void {
    this.service.listContentDetails('1').subscribe(res => {
      if (res.json().status == true) {
        this.excelData = res.json().result;
      } else {
        this.excelData = [];
      }
      this.excelService.exportAsExcelFile(this.excelData, 'Content');
    })
  }

}

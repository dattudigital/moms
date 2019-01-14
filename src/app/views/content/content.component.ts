import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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

  constructor(private spinner: NgxSpinnerService, private service: ContentService, private cdr: ChangeDetectorRef, private toastyService: ToastyService, private formBuilder: FormBuilder) {
    this.contentForm = this.formBuilder.group({
      Name: ['', Validators.required],
      lonDes: ['', Validators.required],
      shortDes: ['', Validators.required],
      Price: ['', Validators.required]
    });
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.spinner.show();
    this.service.listContentDetails().subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        this.ContentData = response.json().result;
      } else {
        this.ContentData = [];
      }
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
        } else {
          let _index = ((this.currentPage - 1) * 3) + this.content["index"]
          if (this.content.content_status == '0') {
            this.ContentData.splice(_index, 1);
          } else {
            this.ContentData[_index] = res.json().result;
          }
        }
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    })
  }


  editContent(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.content = data;
    this.content["index"] = index;
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

}

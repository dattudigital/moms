import { Component, ChangeDetectorRef, OnInit, } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FaqsService } from '../../services/faqs.service';
declare var $: any;
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Component({
  templateUrl: 'faqs.component.html',
})

export class FaqsComponent implements OnInit {
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
  faqData: any;
  copiedRow: any;
  faqsForm: FormGroup;
  faqs: any = {
    'faq_id': null,
    'faq_question': '',
    'faq_answer': '',
    'faq_status': ''
  }
  submitted = false;
  cols: any = [];
  deleteRecord = '';

  constructor(private spinner: NgxSpinnerService, private toastyService: ToastyService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder, private service: FaqsService) { }

  ngAfterViewChecked() {
    //your code to update the model
    this.cdr.detectChanges();
  }

  ngOnInit() {
   
    this.service.getList().subscribe(response => {

      if (response.json().status == true) {
        this.faqData = response.json().data;
      } else {
        this.faqData = [];
      }
    });

    this.cols = [
      { field: 'faq_question', header: 'Question' },
      { field: 'faq_answer', header: 'Answer' },
    ]

    this.faqsForm = this.formBuilder.group({
      Question: ['', Validators.required],
      Answer: ['', Validators.required]
    });
  }

  removeFields() {
    this.submitted = false;
    this.faqs.faq_id = '';
    this.faqs.faq_question = '';
    this.faqs.faq_answer = '';
    this.faqs.faq_status = '';
  }

  get f() { return this.faqsForm.controls; }

  addFaqs() {
    this.submitted = true;
    if (this.faqsForm.invalid) {
      return;
    }
    if (!this.faqs.faq_id) {
      this.faqs.faq_status = '1'
    }
    if (!this.faqs.faq_id) {
      this.faqs.faq_id = null;
    }
    var data = {
      faq_id: this.faqs.faq_id,
      faq_question: this.faqs.faq_question,
      faq_answer: this.faqs.faq_answer,
      faq_status: this.faqs.faq_status
    }
    let modelClose = document.getElementById("CloseButton");
    this.service.addOrUpdateFaq(data).subscribe(res => {
      modelClose.click();
      if (res.json().status == true) {
        if (!this.faqs.faq_id) {
          this.faqData.push(res.json().data)
        } else {
          if (this.faqs.faq_status == '0') {
            this.faqData.splice(this.faqs["index"], 1);
          } else {
            this.faqData[this.faqs["index"]] = res.json().data;
          }
        }
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }

  editFaqs(data, index) {
    this.copiedRow = Object.assign({}, data);
    this.faqs = data;
    this.faqs["index"] = index;
  }
  backupData() {
    let _index = this.faqs["index"];
    this.faqData[_index] = this.copiedRow;
  }
  deleteFaqs(val, index) {
    this.deleteRecord = val;
    this.deleteRecord["index"] = index
  }

  deleteAlert() {
    this.service.addOrUpdateFaq({ faq_id: this.deleteRecord["faq_id"], faq_status: 0 }).subscribe(res => {
      if (res.json().status == true) {
        this.faqData.splice(this.deleteRecord["index"], 1);
        this.toastyService.success(this.toastOptionsSuccess);
      } else {
        this.toastyService.error(this.toastOptionsError);
      }
    });
  }

}

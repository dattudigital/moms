import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions, ToastyConfig, } from 'ng2-toasty';

@Injectable({
  providedIn: 'root'
})
export class ToastyMessageService {

  toastOptionsSuccess: ToastOptions = {
    title: "Success",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsError: ToastOptions = {
    title: "Error",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };
  toastOptionsWarn: ToastOptions = {
    title: "Not Found",
    showClose: true,
    timeout: 3000,
    theme: 'default'
  };

  constructor(private toastyService: ToastyService, private toastyConfig: ToastyConfig) {
    // this.toastyConfig.theme = 'material';
    this.toastyConfig.position = 'top-right';
  }

  successToast(val: any) {
    this.toastOptionsSuccess.msg = val;
    this.toastyService.success(this.toastOptionsSuccess);
  }

  errorToast(val: any) {
    console.log(val)
    this.toastOptionsError.msg = val;
    this.toastyService.error(this.toastOptionsError);
  }

}

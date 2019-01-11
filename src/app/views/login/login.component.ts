import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
  errorMeassage = false;
  loginData = {
    'emailid': '',
    'password': ''
  }
  employeeForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private spinner: NgxSpinnerService, private router: Router, private service: LoginService) { }

  ngOnInit() {
    this.employeeForm = this.formBuilder.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  }
  get f() { return this.employeeForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    var data = {
      email: this.loginData.emailid,
      password: this.loginData.password
    }
    this.spinner.show();
    console.log(data);
    this.service.saveLoginDetails(data).subscribe(response => {
      this.spinner.hide();
      if (response.json().status == true) {
        localStorage.setItem('loginDetails', JSON.stringify(response.json().result));
        this.router.navigate(['dashboard']);
      } else {
        this.errorMeassage = true;
      }
    }, err => {
      this.spinner.hide();
    });

  }

}

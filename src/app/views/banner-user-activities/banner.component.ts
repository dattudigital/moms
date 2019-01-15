import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { BannersService } from '../../services/banners.service';
import { CompeleteMomsService } from '../../services/compelete-moms.service';

@Component({
    templateUrl: 'banner.component.html'
})

export class BannerComponent implements OnInit {
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


    bannersData: any = [];
    bannerForm: FormGroup;
    dealAdd: any = [];
    submitted = false;
    bannerData: any;
    copiedRow = '';
    isShowOriginalImg: boolean = false;
    deleteRecord: '';
    currentPage: any = 1;
    totalItems: number;
    userimagePreview: any;
    userImage: string;
    completeData: any = [];

    banner: any = {
        'promotion_id': null,
        'promotion_name': '',
        'promotion_type': '',
        'promotion_img': '',
        'promotion_img_name':'',
        'promotion_description': '',
        'promotion_for': '',
        'rec_status': ''
    }

    constructor(private service: BannersService, private completeservice: CompeleteMomsService, private spinner: NgxSpinnerService, private toastyService: ToastyService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {

    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnInit() {
        let _banner = this.completeservice.getBanners();
        if (Object.keys(_banner).length) {
            this.bannersData = _banner
        } else {
            this.service.listBanners().subscribe(res => {
                if (res.json().status == true) {
                    this.bannersData = res.json().result;
                    this.completeservice.addBanners(res.json().result)
                }
            })
        }

        this.bannerForm = this.formBuilder.group({
            Name: ['', Validators.required],
            for: ['', Validators.required],
            desc: ['', Validators.required]
        });
    }

    get f() { return this.bannerForm.controls; }

    addOrUpdateBanners() {
        console.log("came")
        this.submitted = true;
        if (this.bannerForm.invalid) {
            return;
        }

        if (!this.banner.rec_status) {
            this.banner.rec_status = '1'
        }
        if (!this.banner.promotion_id) {
            this.banner.promotion_id = null;
        }
        var data = {
            promotion_id: this.banner.promotion_id,
            promotion_name: this.banner.promotion_name,
            promotion_type: this.banner.promotion_type,
            promotion_img: this.banner.promotion_img,
            promotion_img_name:this.banner.promotion_img_name,
            promotion_description: this.banner.promotion_description,
            promotion_for: this.banner.promotion_for,
            rec_status: this.banner.rec_status
        }
        console.log(data);
        let modelClose = document.getElementById("CloseButton");
        this.service.saveBanners(data).subscribe(res => {
            modelClose.click();
            if (res.json().status == true) {
                if (!this.banner.promotion_id) {
                    this.bannersData.push(res.json().result)
                    this.completeservice.addBanners(res.json().result)
                } else {
                    let _index = ((this.currentPage - 1) * 3) + this.banner["index"]
                    console.log(_index)
                    if (this.banner.rec_status == '0') {
                        this.bannersData.splice(_index, 1);
                        this.completeservice.addContentData(this.completeData)
                    } else {
                        this.bannersData[_index] = res.json().result;
                        this.completeservice.addBanners(res.json().result)
                    }
                }
                this.toastyService.success(this.toastOptionsSuccess);
            } else {
                this.toastyService.error(this.toastOptionsError);
            }
        })
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
            this.banner.promotion_img_name = file.name;
            reader.onload = (event) => {
                this.userimagePreview = event.target;
            }
        }
    }

    _handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        this.banner.promotion_img = btoa(binaryString);
        this.isShowOriginalImg = true;
        if (this.banner.promotion_id) {
            this.isShowOriginalImg = true;
        }
    }

    editBanner(data, index) {
        console.log(data);
        this.copiedRow = Object.assign({}, data);
        this.banner = data;
        console.log(this.banner)
        this.banner["index"] = index;
    }

    backupData() {
        console.log('@@@@')
        let _index = ((this.currentPage - 1) * 3) + this.banner["index"]
        console.log(_index);
        this.bannersData[_index] = this.copiedRow;
    }

    deleteBanner(data, index) {
        this.deleteRecord = data;
        this.deleteRecord["index"] = index
        console.log(this.deleteRecord)
    }

    deleteBannerData() {
        this.service.saveBanners({ promotion_id: this.deleteRecord["promotion_id"], rec_status: 0 }).subscribe(res => {
            console.log(res.json());
            if (res.json().status == true) {
                console.log('888')
                let _index = ((this.currentPage - 1) * 3) + this.deleteRecord["index"]
                this.bannerData.splice(_index, 1);
                this.completeservice.addBanners(this.completeData)
                this.toastyService.success(this.toastOptionsSuccess);
            } else {
                this.toastyService.error(this.toastOptionsError);
            }
        });
    }
    removeFields() {
        this.banner.promotion_id = '';
        this.banner.promotion_name = '';
        this.banner.promotion_type = '';
        this.banner.promotion_img = '';
        this.banner.promotion_description = '';
        this.banner.promotion_for = '';
        this.banner.rec_status = '';
    }
}
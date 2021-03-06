import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastyMessageService } from '../../services/toasty-message.service';
import { BannersService } from '../../services/banners.service';
import { CompeleteMomsService } from '../../services/compelete-moms.service';
import { ExcelServiceService } from '../../services/excel-service.service';
import * as moment from 'moment';

@Component({
    templateUrl: 'banner.component.html',
    providers: [ToastyMessageService]
})

export class BannerComponent implements OnInit {
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
    excelData: any = [];

    banner: any = {
        'promotion_id': null,
        'promotion_name': '',
        'promotion_type': '',
        'promotion_img': '',
        'promotion_img_name': '',
        'promotion_description': '',
        'promotion_for': '',
        'from_date': '',
        'end_date': '',
        'rec_status': ''
    }
    selctedPromotionId: any;
    startDate: any;
    endDate: any;

    constructor(private service: BannersService, private excelService: ExcelServiceService, private completeservice: CompeleteMomsService, private spinner: NgxSpinnerService, private toastMessage: ToastyMessageService, private formBuilder: FormBuilder, private cdr: ChangeDetectorRef) {

    }
    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    ngOnInit() {
        this.getBannerData();
        this.bannerForm = this.formBuilder.group({
            Name: ['', Validators.required],
            for: ['', Validators.required],
            desc: ['', Validators.required],
            StartDate: ['', Validators.required],
            EndDate: ['', Validators.required]
        });
    }

    getBannerData() {
        let _banner = this.completeservice.getBanners();
        if (Object.keys(_banner).length) {
            this.bannersData = _banner
        } else {
            this.service.listBanners('').subscribe(res => {
                if (res.json().status == true) {
                    this.bannersData = res.json().result;
                    this.completeservice.addBanners(res.json().result)
                }
            })
        }
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
            promotion_img_name: this.banner.promotion_img_name,
            promotion_description: this.banner.promotion_description,
            promotion_for: this.banner.promotion_for,
            from_date: this.banner.from_date,
            end_date: this.banner.end_date,
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
                    this.toastMessage.successToast("Banner Added Successfully");
                } else {
                    let _index = ((this.currentPage - 1) * 3) + this.banner["index"]
                    console.log(_index)
                    if (this.banner.rec_status == '0') {
                        this.bannersData.splice(_index, 1);
                        this.completeservice.addContentData(this.completeData);
                        this.toastMessage.successToast("Banner Updated Successfully");
                    } else {
                        this.bannersData[_index] = res.json().result;
                        this.completeservice.addBanners(res.json().result);
                        this.toastMessage.successToast("Banner Deleted Successfully");
                    }
                }
            } else {
                this.toastMessage.errorToast('Banner not Added')
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
        this.copiedRow = Object.assign({}, data);
        this.banner = data;
        if (this.banner.from_date) {
            let newDate = moment(this.banner.from_date).format('YYYY-MM-DD').toString();
            this.banner.from_date = newDate;
        }
        if (this.banner.end_date) {
            let newDate = moment(this.banner.end_date).format('YYYY-MM-DD').toString();
            this.banner.end_date = newDate;
        }
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
                this.completeservice.addBanners(this.completeData);
                this.toastMessage.successToast("Banner Deleted Successfully");
            } else {
                this.toastMessage.errorToast('Banner Not Deleted')
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
    exportAsXLSX(): void {
        this.excelService.exportAsExcelFile(this.bannerData, 'Banners');

        // this.service.listBanners('1').subscribe(res => {
        //     if (res.json().status == true) {
        //         this.excelData = res.json().result;
        //     } else {
        //         this.excelData = [];
        //     }
        // })
    }

    searchDetails() {
        var url = '';
        if (this.startDate) {
            url = url + 'startdate=' + this.startDate;
        }
        if (this.endDate) {
            url = url + '&enddate=' + this.endDate;
        }
        if (this.selctedPromotionId) {
            url = url + '&promotionid=' + this.selctedPromotionId;
        }
        console.log(url)
        this.spinner.show();
        this.service.listBanners(url).subscribe(res => {
            this.spinner.hide();
            if (res.json().status == true) {
                this.bannersData = res.json().result;
            } else {
                this.bannersData = [];
                this.toastMessage.errorToast("No Records Found");
            }
        })
    }
    resetDetails() {
        this.selctedPromotionId = undefined;
        this.startDate = null;
        this.endDate = null;
        this.getBannerData();
        this.toastMessage.successToast("Reset Applied Successfully");
    }
}
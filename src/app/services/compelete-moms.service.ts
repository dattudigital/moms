import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompeleteMomsService {

  constructor() { }
  dealTypeData: any = [];
  usersData: any = [];
  dealsData: any = [];
  ContentData:any=[];

  public addDealType(dealType) {
    this.dealTypeData = dealType
  }

  public getDealType() {
    return this.dealTypeData;
  }

  public addUserData(user) {
    this.usersData = user;
  }

  public getUserData() {
    return this.usersData
  }

  public addDealsData(deals) {
    this.dealsData = deals
  }

  public getDealsData() {
    return this.dealsData
  }

  public addContentData(content){
    this.ContentData =content
  }

  public getContentData(){
    return this.ContentData
  }
}

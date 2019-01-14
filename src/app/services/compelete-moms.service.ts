import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompeleteMomsService {

  constructor() { }
  dealTypeData: any = [];
  usersData: any = [];
  dealsData: any = [];
  ContentData: any = [];
  userActivitysData: any = [];
  activitys: any = [];
  users: any = [];

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

  public addContentData(content) {
    this.ContentData = content
  }

  public getContentData() {
    return this.ContentData
  }

  public addUserActivityData(userActivity) {
    this.userActivitysData = userActivity
  }

  public getUserActivityData() {
    return this.userActivitysData;
  }

  public addActivityData(activity) {
    this.activitys = activity
  }

  public getActivityData() {
    return this.activitys
  }

  public addUsers(user) {
    this.users = user;
  }

  public getUsers() {
    return this.users;
  }
}

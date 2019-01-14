import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompeleteMomsService {

  constructor() { }
  dealAdd: any = [];

  public addDealType(message) {
    this.dealAdd = message
  }

  public getDealType() {
    return this.dealAdd;
  }
}

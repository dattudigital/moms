import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeautyTipsService {

  constructor(private http: Http) { }
  public getBeautyTipsList() {
    return this.http.get(environment.host + 'show-beauty-tips');
  }
  public AddOrEditBeautyTip(data:any) {
    return this.http.post(environment.host + 'add-beauty-tips', data);
  }
  
}

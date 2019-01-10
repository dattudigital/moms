import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FaqsService {

 
  constructor(private http: Http) { }
  public addOrUpdateFaq(data:any) {
    return this.http.post(environment.host + 'faqs', data);
  }
  public getList() {
    return this.http.get(environment.host + 'faqs');
  }
}

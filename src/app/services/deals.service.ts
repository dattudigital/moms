import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class DealsService {

  constructor(private http: Http) { }
  public saveDealDetails(dealData: any) {
    return this.http.post(environment.host + 'deals', dealData)
  }
  public listDealDetails(type: any) {
    return this.http.get(environment.host + 'deals?type=' + type)
  }
}

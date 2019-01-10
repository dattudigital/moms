import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: Http) { }
  
  public getVoucherReports(url:any) {
    return this.http.get(environment.host + 'voucher-overview-reports'+url);
  }
}

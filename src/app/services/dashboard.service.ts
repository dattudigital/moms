import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: Http) { }
  
  public getGraphdata() {
    return this.http.get(environment.host + 'graphs');
  }
  public getallCountForDashboard() {
    return this.http.get(environment.host + 'web-dashboard');
  }

}

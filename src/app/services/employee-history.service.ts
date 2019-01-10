import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class EmployeeHistoryService {

  constructor(private http: Http) { }

  public getEmployeeHistory() {
    return this.http.get(environment.host + 'emp-history')
  }
}

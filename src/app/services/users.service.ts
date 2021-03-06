import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: Http) { }

  public saveUser(user: any) {
    return this.http.post(environment.host + 'users', user);
  }

  public getUser(type: any) {
    return this.http.get(environment.host + 'users?type=' + type);
  }

  public getUserActivities(URL: any) {
    return this.http.get(environment.host + 'user-activities/web?' + URL);
  }
}

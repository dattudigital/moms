import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private http: Http) { }
  public getUsersList() {
    return this.http.get(environment.host + 'get_users_list');
  }
  public getMaleCount() {
    return this.http.get(environment.host + 'get_male_users_count');
  }
  public getFemaleCount() {
    return this.http.get(environment.host + 'get_female_users_count');
  }
}

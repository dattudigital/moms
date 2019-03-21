import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserActivitiesService {

  constructor(private http: Http) { }

  public saveActivitiesDetails(activity: any) {
    return this.http.post(environment.host + 'activities', activity);
  }

  public getActivity(type: any) {
    return this.http.get(environment.host + 'activities?type=' + type);
  }

}

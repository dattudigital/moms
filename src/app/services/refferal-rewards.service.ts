import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RefferalRewardsService {

  constructor(private http: Http) { }
  public getUserActivitiesList() {
    return this.http.get(environment.host + 'reffer-activities');
  }
  public _addOrEditRefferalActivities(data:any) {
    return this.http.post(environment.host + 'reffer-activities', data);
  }
  public getPerksList() {
    return this.http.get(environment.host + 'reward-points');
  }
  public addOrEditPerksList(data:any) { 
    return this.http.post(environment.host + 'reward-points', data);
  }
  public getMindBodyCoupons() {
    return this.http.get(environment.host + 'mindbody-coupons');
  }
  public addoreditMindBodyCoupons(data:any) {
    return this.http.post(environment.host + 'mindbody-coupons',data); 
  }
  public addBulkMindBodyCoupons(data:any){
     return this.http.post(environment.host + 'bulk-uplod',data);

  }
  public getUserlistForHistory(data:any) {
    return this.http.get(environment.host + 'user-search?name='+data);
  }
  public getUserRewardHistory(id:number) {
    return this.http.get(environment.host + 'reward_histories/'+id);
  }

  public addUserPoints(data:any){
    return this.http.post(environment.host +'user-points',data)
  }
}

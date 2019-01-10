import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BroadcastSmsService {

  constructor(private http: Http) { }

  public getBroadcastIds() {
    return this.http.get(environment.host + 'studioids');
  }

  public locationsId(broadcastId: any) {
    return this.http.get(environment.host + 'locationids/' + broadcastId);
  }

  public broadcastSend(data:any){
   return this.http.post(environment.host + 'group-sms',data)
  }

  public getBroadcastIdFromMembership(){
    return this.http.get(environment.host + 'studioid-memberships')
   }

   public sendBroadcastIdForMembership(data:any){
    return this.http.post(environment.host + 'studioid-memberships-sms',data)
   }

}

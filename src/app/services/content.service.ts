import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {environment} from '../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http:Http) { }
  public saveContentDetails(data: any) {
    return this.http.post(environment.host + 'contents',data);
  }
  public listContentDetails(){
    return this.http.get( environment.host + 'contents');
  }
}

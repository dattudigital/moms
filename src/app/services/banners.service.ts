import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BannersService {

  constructor(private http: Http) { }

  public saveBanners(data: any) {
    return this.http.post(environment.host + 'promotions', data);
  }

  public listBanners(URL: any) {
    return this.http.get(environment.host + 'promotions?' + URL);
  }

}

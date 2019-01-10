import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TestmonialsService {
  constructor(private http: Http) { }
  public editWrittenTestmonials(data: any) {
    return this.http.post(environment.host + 'written-testimonials', data);
  }
  public getWrittenTestmonials() {
    return this.http.get(environment.host + 'written-testimonials');
  }
  public editVideoTestmonials(data: any) {
    return this.http.post(environment.host + 'video-testimonials', data);
  }
  public getVideoTestmonials() {
    return this.http.get(environment.host + 'video-testimonials');
  }
}
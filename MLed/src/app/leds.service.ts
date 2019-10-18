import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class LedsService {

  constructor(private httpclient: HttpClient) { }
  getLeds() {
    return this.httpclient.get('http://127.0.0.1:3000/led');
  }
  changeLed(id, status) {
    return this.httpclient.post('http://127.0.0.1:3000/led/' + id + '/' + status, {});
  }
}

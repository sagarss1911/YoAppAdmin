import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LegalService {

  private addLegalUrl = environment.url + "/api/v1/legal/add_legal";
  private getLegalUrl = environment.url + "/api/v1/legal/get_legal";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', "12345");
    return headers;
  }
  addLegal(data) {
    return this.http.post(this.addLegalUrl, data, { 'headers': this.getHeader() });
  }
  getLegal(data) {
    return this.http.post(this.getLegalUrl, data, { 'headers': this.getHeader() });
  }
}

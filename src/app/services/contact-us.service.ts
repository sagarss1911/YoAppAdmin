import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactusService {


  private getContactUsUrl = environment.url + "/api/contact_us/get_contact_us";
  private deleteContactUsUrl = environment.url + "/api/contact_us/remove_contact_us/";

  private addContactUsSeoUrl = environment.url + "/api/contact_us/add_contact_us_seo";
  private getContactUsSeoUrl = environment.url + "/api/contact_us/get_contact_us_seo";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }
  getContactUs(data) {
    return this.http.post(this.getContactUsUrl, data, { 'headers': this.getHeader() });
  }
  deleteContactUs(id) {
    return this.http.delete(this.deleteContactUsUrl + id, { 'headers': this.getHeader() })
  }
  getContactUsSeo(data) {
    return this.http.post(this.getContactUsSeoUrl, data, { 'headers': this.getHeader() });
  }

  addContactUsSeo(data) {
    return this.http.post(this.addContactUsSeoUrl, data, { 'headers': this.getHeader() });
  }

}

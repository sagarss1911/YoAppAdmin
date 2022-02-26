import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SupportRequestService {


  private updateSupportRequestUrl = environment.url + "/api/v1/Admin/support_request/update_status_support_request/";
  private getAllSupportRequestUrl = environment.url + "/api/v1/Admin/support_request/get_all_support_request";
  private deleteSupportRequestUrl = environment.url + "/api/v1/Admin/support_request/remove_support_request/";




  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', "12345");
    return headers;
  }
  updateStatusSupportRequest(id, data) {
    return this.http.put(this.updateSupportRequestUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllSupportRequest(data) {
    return this.http.post(this.getAllSupportRequestUrl, data, { 'headers': this.getHeader() });
  }
  deleteSupportRequest(id) {
    return this.http.delete(this.deleteSupportRequestUrl + id, { 'headers': this.getHeader() })
  }

}

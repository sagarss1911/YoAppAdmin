import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private getBankTransferCountUrl = environment.url + "/api/v1/admin/dashboard/get_bank_transfer_reporting";


  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', "12345");
    return headers;
  }

  getBankTransferCount() {
    return this.http.get(this.getBankTransferCountUrl, { 'headers': this.getHeader() });
  }

}

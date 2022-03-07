import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CashPickupService {


  private getAllCashPickupUrl = environment.url + "/api/v1/admin/cash_pickup/get_all_cash_pickup";
  private exportAllCashPickupRequestUrl = environment.url + "/api/v1/admin/cash_pickup/export_all_cash_pickup";



  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', "12345");
    return headers;
  }

  getAllBankDetails(data) {
    return this.http.post(this.getAllCashPickupUrl, data, { 'headers': this.getHeader() });
  }

  exportAllCashPickupRequest(data) {
    return this.http.post(this.exportAllCashPickupRequestUrl, data, { 'headers': this.getHeader() });
  }
}

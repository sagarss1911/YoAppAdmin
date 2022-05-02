import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BankTransferMerchantService {


  private getAllBankTransferUrl = environment.url + "/api/v1/admin/bank_transfer_merchant/get_all_bank_transfer";
  private exportAllBankRequestUrl = environment.url + "/api/v1/admin/bank_transfer_merchant/export_all_bank_request";
  private updateBankRequestUrl = environment.url + "/api/v1/admin/bank_transfer_merchant/update_bank_request_status/";



  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }

  getAllBankDetails(data) {
    return this.http.post(this.getAllBankTransferUrl, data, { 'headers': this.getHeader() });
  }
  updateStatusBankRequest(id, data) {
    return this.http.put(this.updateBankRequestUrl + id, data, { 'headers': this.getHeader() });
  }
  exportAllBankRequest(data) {
    return this.http.post(this.exportAllBankRequestUrl, data, { 'headers': this.getHeader() });
  }
}

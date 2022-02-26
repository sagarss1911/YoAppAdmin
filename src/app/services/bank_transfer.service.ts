import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BankTransferService {


  private getAllBankTransferUrl = environment.url + "/api/v1/admin/bank_transfer/get_all_bank_transfer";





  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', "12345");
    return headers;
  }
 
  getAllBankDetails(data) {
    return this.http.post(this.getAllBankTransferUrl, data, { 'headers': this.getHeader() });
  }


}

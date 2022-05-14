import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CashTopupService {



  private getAllUserForCashTopupUrl = environment.url + "/api/v1/admin/cash_topup/get_all_users";
  private addBalanceToUserWalletUrl = environment.url + "/api/v1/admin/cash_topup/add_balance_to_user_wallet";
  private getAllCashTopupUrl = environment.url + "/api/v1/admin/cash_topup/get_all_cash_topup";
  private exportAllCashTopupRequestUrl = environment.url + "/api/v1/admin/cash_topup/export_all_cash_topup";


  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key',environment.key);
    return headers;
  }

  getAllUserForCashTopup() {
    return this.http.get(this.getAllUserForCashTopupUrl,  { 'headers': this.getHeader() });
  }
  addBalanceToUserWallet(data) {
    return this.http.post(this.addBalanceToUserWalletUrl,data,  { 'headers': this.getHeader() });
  }
  getAllCashTopup(data){
    return this.http.post(this.getAllCashTopupUrl,data,  { 'headers': this.getHeader() });
  }
  exportAllCashTopupRequest(data){
    return this.http.post(this.exportAllCashTopupRequestUrl,data,  { 'headers': this.getHeader() });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MerchantService {


  private getAllMerchantUrl = environment.url + "/api/v1/admin/merchant/get_all_merchant";
  private exportAllMerchantUrl = environment.url + "/api/v1/admin/merchant/export_all_merchant";
  private updateMerchantUrl = environment.url + "/api/v1/admin/merchant/update_merchant_status/";
  private updateMerchantProfileUrl = environment.url + "/api/v1/admin/merchant/update_merchant/";
  private updateMerchantDuePaymentUrl = environment.url + "/api/v1/admin/merchant/update_merchant_due_payment/";
  private getAllMerchantPaymentHistoryUrl = environment.url + "/api/v1/admin/merchant/get_topup_merchant_history/";



  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }

  getAllMerchant(data) {
    return this.http.post(this.getAllMerchantUrl, data, { 'headers': this.getHeader() });
  }
  getAllMerchantPaymentHistory  (id,data) {
    return this.http.post(this.getAllMerchantPaymentHistoryUrl + id, data, { 'headers': this.getHeader() });
  }
  updateStatusMerchant(id, data) {
    return this.http.put(this.updateMerchantUrl + id, data, { 'headers': this.getHeader() });
  }
  updateMerchantProfile(id, data) {
    return this.http.put(this.updateMerchantProfileUrl + id, data, { 'headers': this.getHeader() });
  }
  updateMerchantDuePayment(id, data) {
    return this.http.put(this.updateMerchantDuePaymentUrl + id, data, { 'headers': this.getHeader() });
  }

  exportAllMerchant(data) {
    return this.http.post(this.exportAllMerchantUrl, data, { 'headers': this.getHeader() });
  }
}

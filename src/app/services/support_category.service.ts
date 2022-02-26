import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SupportCategoryService {


  private addCategoryUrl = environment.url + "/api/v1/admin/support_category/add_support_category";
  private updateCategoryUrl = environment.url + "/api/v1/admin/support_category/update_support_category/";
  private getAllCategoryUrl = environment.url + "/api/v1/admin/Support_category/get_all_support_category/";
  private deleteCategoryUrl = environment.url + "/api/v1/admin/Support_category/delete_support_category/";




  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', "12345");
    return headers;
  }
  addSupportCategory(data) {
    return this.http.post(this.addCategoryUrl, data, { 'headers': this.getHeader() });
  }
  updateSupportCategory(id, data) {
    return this.http.put(this.updateCategoryUrl + id, data, { 'headers': this.getHeader() });
  }
  getAllSupportCategory(data) {
    return this.http.post(this.getAllCategoryUrl, data, { 'headers': this.getHeader() });
  }
  deleteSupportCategory(id) {
    return this.http.delete(this.deleteCategoryUrl + id, { 'headers': this.getHeader() })
  }

}

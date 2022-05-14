import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {


  private addUserUrl = environment.url + "/api/v1/admin/user_management/add_admin_user/";
  private getAllUserListUrl = environment.url + "/api/v1/admin/user_management/get_all_user_list/";
  private updateUserUrl = environment.url + "/api/v1/admin/user_management/update_user/";
  private statusChangeUrl = environment.url + "/api/v1/admin/user_management/status_change/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }

  addUser(data) {
    return this.http.post(this.addUserUrl, data, { 'headers': this.getHeader() });
  }
  getAllUserList(data) {
    return this.http.post(this.getAllUserListUrl, data, { 'headers': this.getHeader() });
  }
  updateUser(id, data) {
    return this.http.put(this.updateUserUrl + id, data, { 'headers': this.getHeader() });
  }
  statusChange(id, data) {
    return this.http.put(this.statusChangeUrl + id, data, { 'headers': this.getHeader() });
  }


}

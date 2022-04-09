import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  private getAllPermissionUrl = environment.url + "/api/v1/admin/Permission/get_all_permission_urls/";
  private addPermissionUrl = environment.url + "/api/v1/admin/Permission/add_permission/";
  private getAllPermissionListUrl = environment.url + "/api/v1/admin/Permission/get_all_permission_list/";
  private updatePermissionUrl = environment.url + "/api/v1/admin/Permission/update_permission/";

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }
  getAllPermissionUrlList() {
    return this.http.get(this.getAllPermissionUrl, { 'headers': this.getHeader() });
  }
  addPermission(data) {
    return this.http.post(this.addPermissionUrl, data, { 'headers': this.getHeader() });
  }
  getAllPermissionList(data) {
    return this.http.post(this.getAllPermissionListUrl, data, { 'headers': this.getHeader() });
  }
  updatePermission(id, data) {
    return this.http.put(this.updatePermissionUrl + id, data, { 'headers': this.getHeader() });
  }

}

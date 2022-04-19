import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlansService {


  private getAllPlansUrl = environment.url + "/api/v1/admin/plans/get_all_plans";
  private addPlanUrl = environment.url + "/api/v1/admin/plans/add_plan";
  private updatePlanUrl = environment.url + "/api/v1/admin/plans/update_plan/";
  private updateDefaultPlanUrl = environment.url + "/api/v1/admin/plans/update_default_plan/";
  private getAllPlansForDropdownUrl = environment.url + "/api/v1/admin/plans/get_all_plans";



  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({ 'x-auth-token': (localStorage.getItem('token') || "") });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }

  getAllPlans(data) {
    return this.http.post(this.getAllPlansUrl, data, { 'headers': this.getHeader() });
  }
  getAllPlansForDropdown() {
    return this.http.get(this.getAllPlansForDropdownUrl, { 'headers': this.getHeader() });
  }
  updatePlan(id, data) {
    return this.http.put(this.updatePlanUrl + id, data, { 'headers': this.getHeader() });
  }
  updateDefaultPlan(id, data) {
    return this.http.put(this.updateDefaultPlanUrl + id, data, { 'headers': this.getHeader() });
  }

  addPlan(data) {
    return this.http.post(this.addPlanUrl, data, { 'headers': this.getHeader() });
  }
}

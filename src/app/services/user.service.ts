import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {


  private updatePasswordurl = environment.url + '/api/v1/auth/changepassword';
  private imageSource = new BehaviorSubject('default image');
  currentProfileImage = this.imageSource.asObservable();

  constructor(private http: HttpClient) { }
  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }


  updatePassword(data) {
    return this.http.patch(this.updatePasswordurl, data, {
      headers: this.getHeader(),
    });
  }


}

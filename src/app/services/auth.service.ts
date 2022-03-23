import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of as observableOf, Subject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loginEndpoint: string = environment.url + '/api/v1/auth/login';
  public forgotPasswordEndpoint: string =
    environment.url + '/api/organization_user/forgot_password';
  public resetPasswordEndpoint: string =
    environment.url + '/api/organization_user/reset_password';
  public logoutEndpoint: string =
    environment.url + '/api/v1/auth/logOut';
  public isAuthenticated = false;
  public isLicenceValidated = false;
  private authStatusListener = new Subject<boolean>();
  userId: string;

  constructor(private http: HttpClient) { }

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      'x-auth-token': localStorage.getItem('token') || '',
    });
    headers = headers.append('x-auth-api-key', environment.key);
    return headers;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return observableOf(this.isAuthenticated);
  }

  setIsAuth(isAuth: boolean) {
    this.isAuthenticated = isAuth;
    return observableOf(this.isAuthenticated);
  }



  login(params) {
    return this.http.post(this.loginEndpoint, params, {});
  }

  logout() {
    return this.http.post(
      this.logoutEndpoint,
      {},
      { headers: this.getHeader() }
    );
  }

  forgotPassword(params) {
    return this.http.post(this.forgotPasswordEndpoint, params, {});
  }

  resetPassword(params) {
    return this.http.post(this.resetPasswordEndpoint, params, {});
  }

  getAuthDataFromStorage() {
    const token = localStorage.getItem('token');
    const userid = localStorage.getItem('userid');
    if (!token) {
      return;
    }
    return {
      token: token
    };
  }
}

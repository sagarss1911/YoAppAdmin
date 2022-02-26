import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { PermissionHelper } from 'src/app/helpers/permissions.helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userPass: any;
  userEmail: any;
  resetEmail: any;
  step: any = 'login';
  loading: boolean = false;
  constructor(private authService: AuthService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private router: Router) { }

  ngOnInit(): void {
    this.changeStep('login');
  }

  login() {
    if (!this.userEmail || !this.userPass) {
      return;
    }
    const data = {
      email: this.userEmail.trim().toLowerCase(),
      password: this.userPass
    }

    this.loading = true;
    this.authService.login(data).subscribe((response: any) => {
      this.loading = false;
      if (response.data && response.data.accessToken && response.data.userId) {
        this._toastMessageService.alert("Success", "Login Successfull, Please wait...");
        localStorage.token = response.data.accessToken;
        localStorage.userid = response.data.userId;
        this.authService.setIsAuth(true);
        this.router.navigate(['/']);
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    });
  }

  forgotPassword() {
    if (!this.resetEmail) {
      this._toastMessageService.alert("error", "please enter email");
    }

    this.loading = true;
    let data = { email: this.resetEmail.trim().toLowerCase() };
    this.authService.forgotPassword(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200) {
        this._toastMessageService.alert("success", "We have sent a reset password link to your email. Didn’t receive the email? Check email address again or look in your spam folder.")
        this.changeStep('login');
      }
    }, error => {
      this.loading = false;
      this.commonHelper.showError(error);
    });
  }


  changeStep(tstep) {
    this.userEmail = '';
    this.userPass = '';
    this.resetEmail = '';
    this.step = tstep;
  }
}

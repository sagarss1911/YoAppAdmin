import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',  
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  userPass : any;
  userConfirmPass : any;
  resetEmail : any;
  loading : boolean = false;
  accessToken : any = "";
  constructor(private authService : AuthService,private commonHelper: CommonHelper,
    private route: ActivatedRoute, private _toastMessageService: ToastMessageService, 
    private router : Router) {
      this.route.queryParams.subscribe(params => {
          if(params) {
            this.resetEmail = params["email"] ? params["email"] : "";
            this.accessToken = params["accessToken"] ? params["accessToken"] : "";
          }
      });
  }

  ngOnInit(): void {

  }

  resetPassword() {
    if(!this.resetEmail || !this.accessToken) {
      this._toastMessageService.alert("error","invalid link");
      return;
    } 

    if(this.userPass != this.userConfirmPass) {
      this._toastMessageService.alert("error","password and confirm password not matched");      
      return;
    }

    this.loading = true;
    let data = {
      email : this.resetEmail.trim().toLowerCase(),
      password : this.userPass,
      token : this.accessToken
    };
    this.authService.resetPassword(data).subscribe((res:any) => {
      this.loading = false;
      if(res.status == 200) {
        this._toastMessageService.alert("success","password reset successfully.")
        this.router.navigate(['/login']);        
      }
    }, error => {
      this.loading = false;
      this.commonHelper.showError(error);
    });
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}

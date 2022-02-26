import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { PermissionHelper } from 'src/app/helpers/permissions.helper';
import { Router } from '@angular/router';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { MessagePassService } from 'src/app/services/message-pass.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import $ from 'jquery';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  message: string;
  subscription: Subscription;
  clientName: any;
  orgname: any;
  oldPass: any;
  newPass: any;
  conPass: any;
  permissions: any = {};
  loading: boolean = false;
  organization_logo_url = "assets/img/ALCOPHONY-LOGO.png";
  newNotificationCount: any = 0;
  userImage: any;
  isLicenceValidated = true;
  constructor(
    private authservice: AuthService,
    private userService: UserService,
    private router: Router,
    private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService,
    private _messagePassService: MessagePassService
  ) {

  }

  ngOnInit(): void {
    $('#sidebarToggleTop').on('click', function () {
      $('.sidebar-dark ').toggleClass('toggled');
    });

    $('#sidebarToggle').on('click', function () {
      $('.sidebar-dark ').toggleClass('toggled');
    });

  }

  ngAfterViewInit() {
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  logout() {
    this.loading = true;
    this.authservice.logout().subscribe(
      (res: any) => {
        this.loading = false;
        this.authservice.setIsAuth(false);
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      (error) => {
        this.loading = false;
        //this.commonHelper.showError(error);
        this.router.navigate(['/login']);
      }
    );
  }

  changePassword() {
    const data = {
      old_password: this.oldPass,
      new_password: this.newPass,
    };
    this.loading = true;
    this.userService.updatePassword(data).subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status == 200) {
          this._toastMessageService.alert('success', 'Password Updated.');
          document.getElementById('cancelChangePass').click();
        }
      },
      (err) => {
        this.loading = false;
        this.commonHelper.showError(err);
      }
    );
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  overallAnaLoading: boolean = false;

  public modalRef: BsModalRef;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {

  }

}

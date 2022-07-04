import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import * as moment from 'moment';
import { Chart,registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  permissions: any = [];
  overallAnaLoading: boolean = false;
  chart:any;
  bankTransferRequest:any = {
    "totalBankTransferRequestToday": 0,
    "totalBankTransferRequestForCurrentMonth": 0,
    "totalBankTransferRequesttillDate": 0,
    "totalBankTransferCompletedRequestToday": 0,
    "totalBankTransferCompletedRequestForCurrentMonth": 0,
    "totalBankTransferCompletedRequesttillDate": 0,
    "totalSupportRequest": 0,
    "pendingSupportRequest": 0,
    "completedSupportRequest": 0,
    "totalUsers": 0,
    "totalMerchants": 0,
    "totalVerifiedMerchants": 0
}
  public modalRef: BsModalRef;
  constructor(private authservice: AuthService,private dashboardService : DashboardService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.permissions = localStorage.permission
    if(this.permissions.includes("dashboard")){
      this.getBankTransferCount();
    }

  }
  getBankTransferCount(){
    this.overallAnaLoading = true;
    this.dashboardService.getBankTransferCount().subscribe((res: any) => {
      if (res.status == 200) {
        this.overallAnaLoading = false;
        this.bankTransferRequest = res.data;
        const labels = ["Today","Current Month","Till Date"];
        const data = {
          labels: labels,
          datasets: [{
            label: "Total",
            data: [this.bankTransferRequest.totalBankTransferRequestToday,this.bankTransferRequest.totalBankTransferRequestForCurrentMonth,this.bankTransferRequest.totalBankTransferRequesttillDate],
            backgroundColor: 'rgb(75, 192, 192)',
            borderWidth: 0,

          },{
            label: 'Pending',
            data: [this.bankTransferRequest.totalBankTransferPendingRequestToday,this.bankTransferRequest.totalBankTransferPendingRequestForCurrentMonth,this.bankTransferRequest.totalBankTransferPendingRequesttillDate],
            borderColor: '',
            backgroundColor: 'rgb(255, 99, 132)',
            borderWidth: 0,

          }]
        };
        this.chart = new Chart('canvas',  {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  // forces step size to be 50 units
                  stepSize: 2
                }
              }
            }
          },
        });
      } else if (res.status == 400) {
        this.overallAnaLoading = false;
      }
    });

  }

}

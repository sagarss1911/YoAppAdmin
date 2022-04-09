import { Component, OnInit, ViewChild } from '@angular/core';
import { LegalService } from 'src/app/services/legal.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'merchant-limit-management',
  templateUrl: './merchant-limit-management.component.html',
  styleUrls: ['./merchant-limit-management.component.css']
})
export class MerchantLimitManagementComponent implements OnInit {
  loading: boolean = false;
  hide: boolean = false;
  commondata: any;
  setting_Obj: any = {};
  data: any;
  editformdata = false;
  base_url = environment.url;

  constructor(private legalService: LegalService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

    this.getMerchantLimit();

  }
  getMerchantLimit(){
    return new Promise((resolve, reject) => {
      this.legalService.getMerchantLimit().subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {
            this.setting_Obj = JSON.parse(JSON.stringify(res.data));
          }
          else {
            this.editformdata = true;
          }
          return resolve(true);
        },
        (error) => {
          this.commonHelper.showError(error);
          return resolve(false);
        }
      );
    });
  }

  addTermCondition() {
    let params = {
      merchant_cashtopup: this.setting_Obj.merchant_cashtopup,
      merchant_cashpickup: this.setting_Obj.merchant_cashpickup
    }
    this.loading = true;
    this.legalService.updateMerchantLimit(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Limit updated successfully.");
        this.editformdata = false;
        this.getMerchantLimit();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
}





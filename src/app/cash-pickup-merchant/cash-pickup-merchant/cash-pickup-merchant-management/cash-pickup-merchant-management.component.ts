import { Component, OnInit, ViewChild } from '@angular/core';
import { CashPickupMerchantService } from 'src/app/services/cash_pickup_merchant.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'cash-pickup-merchant-management',
  templateUrl: './cash-pickup-merchant-management.component.html',
  styleUrls: ['./cash-pickup-merchant-management.component.css']
})
export class  CashPickupMerchantManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters:any = {};
  public setting_Obj: any = {}
  todayDate = new Date();
  base_url = environment.url;
  public dialogType: string = "add";
  status : boolean = true

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public merchant_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private cashPickupMerchantService : CashPickupMerchantService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getAllMerchants();
    this.getSlidersWithFilters({ page: 1 });

    this.table_data = [{data :{slides : {category : 'category'}}}]
  }
  getAllMerchants() {
    this.loading = true;
    return new Promise((resolve, reject) => {
      this.cashPickupMerchantService.getAllMerchants().subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.merchant_data = [];
          this.merchant_data = JSON.parse(JSON.stringify(res.data));
        } else if (res.status == 400) {
          this._toastMessageService.alert("error", res.data.msg);
        }
        this.loading = false;
        return resolve(true);
      }, (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
        return resolve(false);
      })
    });

  }


  getSlidersWithFilters(event) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters: {},
        page: event.page,
        limit: event.limit ? event.limit : this.recordLimit
      };
      this.recordLimit = params.limit;
      if(this.filters.selectedMerchant) {
        params["filters"]["selectedMerchant"] = this.filters.selectedMerchant;
      }
        if(this.filters.searchtext) {
        params["filters"]["searchtext"] = this.filters.searchtext.trim();
      }
      if (this.filters.from_date) {
        params["filters"]["from_date"] = this.filters.from_date;
      }
      if (this.filters.to_date) {
        params["filters"]["to_date"] = this.filters.to_date;
      }

      this.cashPickupMerchantService.getAllBankDetails(params).subscribe((res: any) => {
        if (res.status == 200 && res.data.slides) {
          this.table_data = [];
          this.table_data = JSON.parse(JSON.stringify(res.data.slides));

          this.paginationValues.next({ type: 'page-init', page: params.page, totalTableRecords: res.data.total_count });
        } else if (res.status == 400) {
          this._toastMessageService.alert("error", res.data.msg);
        }
        this.loading = false;
        return resolve(true);
      }, (error) => {
        this.loading = false;
        this.commonHelper.showError(error);
        return resolve(false);
      })
    });

  }



  exportCurrent(){
    this.loading = true;
    let headerList = ["name","email","phone",'amount','transaction_id','merchantname','createdAt']
    this.commonHelper.downloadFile(this.table_data,"Cash Pickup Request", headerList);
    this.loading = false;
  }
  exportAll(){
    let params = {
      filters: {}
    };
    if (this.filters.searchtext) {
      params["filters"]["searchtext"] = this.filters.searchtext.trim();
    }
    if (this.filters.from_date) {
      params["filters"]["from_date"] = this.filters.from_date;
    }
    if (this.filters.to_date) {
      params["filters"]["to_date"] = this.filters.to_date;
    }
    if(this.filters.selectedMerchant) {
      params["filters"]["selectedMerchant"] = this.filters.selectedMerchant;
    }
    this.loading = true;
    this.cashPickupMerchantService.exportAllCashPickupRequest(params).subscribe((res: any) => {
      if (res.status == 200 && res.data) {

        let headerList = ["name","email","phone",'amount','transaction_id','merchantname','createdAt']
        this.commonHelper.downloadFile(JSON.parse(JSON.stringify(res.data)),"Cash Pickup Request All", headerList);

      } else if (res.status == 400) {
        this._toastMessageService.alert("error", res.data.msg);
      }
      this.loading = false;

    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);

    })
  }
}

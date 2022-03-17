import { Component, OnInit, ViewChild } from '@angular/core';
import { CashPickupService } from 'src/app/services/cash_pickup.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'cash-pickup-management',
  templateUrl: './cash-pickup-management.component.html',
  styleUrls: ['./cash-pickup-management.component.css']
})
export class  CashPickupManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters:any = {};
  public setting_Obj: any = {}

  base_url = environment.url;
  public dialogType: string = "add";
  status : boolean = true

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private cashPickupService : CashPickupService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getSlidersWithFilters({ page: 1 });

    this.table_data = [{data :{slides : {category : 'category'}}}]
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
        if(this.filters.searchtext) {
        params["filters"]["searchtext"] = this.filters.searchtext;
      }
      this.cashPickupService.getAllBankDetails(params).subscribe((res: any) => {
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
    let headerList = ["name","email","phone",'amount','transaction_id','useremail']
    this.commonHelper.downloadFile(this.table_data,"Cash Pickup Request", headerList);
    this.loading = false;
  }
  exportAll(){
    let params = {
      filters: {}
    };
    if (this.filters.searchtext) {
      params["filters"]["searchtext"] = this.filters.searchtext;
    }
    this.loading = true;
    this.cashPickupService.exportAllCashPickupRequest(params).subscribe((res: any) => {
      if (res.status == 200 && res.data) {

        let headerList = ["name","email","phone",'amount','transaction_id','useremail']
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { CashTopupService } from 'src/app/services/cash_topup.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
import {AddCashTopupModalComponent} from 'src/app/cash-topup/cash-topup-management/add-cash-top-up-modal/add-cash-top-up-modal.component'
@Component({
  selector: 'cash-topup-management',
  templateUrl: './cash-topup-management.component.html',
  styleUrls: ['./cash-topup-management.component.css']
})
export class  CashTopupManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters:any = {};
  public setting_Obj: any = {}
  users_data: any = [];
  todayDate = new Date();
  permissions: any = [];
  base_url = environment.url;
  public dialogType: string = "add";
  status : boolean = true

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public merchant_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private cashTopupService : CashTopupService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.permissions = localStorage.permission
    if(this.permissions.includes("cash-topup")){
    this.getAllUsers();
    this.getSlidersWithFilters({ page: 1 });

    this.table_data = [{data :{slides : {category : 'category'}}}]
    }
  }
  getAllUsers() {
    this.loading = true;
    this.cashTopupService.getAllUserForCashTopup().subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this.users_data = res.data


      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }


  onClickAddSlider() {
    this.setting_Obj = {
      id: null,
    };

    this.dialogType = 'add';
    this.showAddSliderModal();
  }
  showAddSliderModal() {
    this.modalRef = this.modalService.show(AddCashTopupModalComponent, { class: 'add-update-faq-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = "";
    this.modalRef.content.dialogType = this.dialogType;
    this.modalRef.content.setting_Obj = this.setting_Obj;
    this.modalRef.content.users_data = this.users_data;

    var tempSubObj: Subscription = this.modalRef.content.onHide.subscribe(() => {
      if (this.modalRef.content.decision === 'done') {
        if (this.dialogType == "add") {
          this.table_data.unshift(JSON.parse(JSON.stringify(this.modalRef.content.dialogResult)));
        } else if (this.dialogType == "update") {
          for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
            if (this.table_data[i].id == this.modalRef.content.dialogResult.id) {
              this.table_data[i] = this.modalRef.content.dialogResult;
              break;
            }
          }
        }
      }
      tempSubObj.unsubscribe();
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
      if(this.filters.selectedUser) {
        params["filters"]["selectedUser"] = this.filters.selectedUser;
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

      this.cashTopupService.getAllCashTopup(params).subscribe((res: any) => {
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
    let headerList = ["name","email","phone",'amount','trans_id','order_date']
    this.commonHelper.downloadFile(this.table_data,"Cash Topup Request", headerList);
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
    if(this.filters.selectedUser) {
      params["filters"]["selectedUser"] = this.filters.selectedUser;
    }
    this.loading = true;
    this.cashTopupService.exportAllCashTopupRequest(params).subscribe((res: any) => {
      if (res.status == 200 && res.data) {

        let headerList = ["name","email","phone",'amount','trans_id','order_date']
        this.commonHelper.downloadFile(JSON.parse(JSON.stringify(res.data)),"Cash Topup Request All", headerList);

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

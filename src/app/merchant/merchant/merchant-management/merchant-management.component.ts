import { Component, OnInit } from '@angular/core';
import { MerchantService } from 'src/app/services/merchant.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UpdateMerchantModalComponent } from 'src/app/merchant/merchant/merchant-management/merchant-edit-modal/merchant-edit-modal.component';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MerchantPaymentHistoryComponent } from 'src/app/merchant/merchant/merchant-management/merchant-payment-history/merchant-payment-history.component';

@Component({
  selector: 'merchant-management',
  templateUrl: './merchant-management.component.html',
  styleUrls: ['./merchant-management.component.css']
})
export class  MerchantManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters:any = {};
  public setting_Obj: any = {}
  todayDate = new Date();
  base_url = environment.url;
  public dialogType: string = "add";
  status : boolean = true
  permissions: any = [];

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public slider_obj: any = {}
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private merchantService: MerchantService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.permissions = localStorage.permission
    if(this.permissions.includes("merchant")){
    this.getSlidersWithFilters({ page: 1 });

    this.table_data = [{data :{slides : {category : 'category'}}}]
    }
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
        params["filters"]["searchtext"] = this.filters.searchtext.trim();
      }
      if (this.filters.from_date) {
        params["filters"]["from_date"] = this.filters.from_date;
      }
      if (this.filters.to_date) {
        params["filters"]["to_date"] = this.filters.to_date;
      }
      this.merchantService.getAllMerchant(params).subscribe((res: any) => {
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

  onClickStatusChange(data,field){
    this.loading = true;
    let newData = {
      field: field,
      status:0
    };
    if(field == "isMerchantEnabled"){
      newData.status = data.isMerchantEnabled == 0 ? 1 : 0;

    }else if(field == "isMerchantVerified"){
      newData.status = data.isMerchantVerified == 0 ? 1 : 0;
    }
    else if(field == "isMerchantUpgraded"){
      newData.status = data.isMerchantUpgraded == 0 ? 1 : 0;
    }
    else if(field == "isCashTopupEnabled"){
      newData.status = data.isCashTopupEnabled == 0 ? 1 : 0;
    }


    this.merchantService.updateStatusMerchant(data.id,newData).subscribe((res: any) => {
      if (res.status == 200) {
        if(field == "isMerchantEnabled"){
          data.isMerchantEnabled = newData.status;
        }else if(field == "isMerchantVerified"){
          data.isMerchantVerified = newData.status;
        }else if(field == "isMerchantUpgraded"){
          data.isMerchantUpgraded = newData.status;
        }else if(field == "isCashTopupEnabled"){
          data.isCashTopupEnabled = newData.status;
        }
        this._toastMessageService.alert("success","Status Updated Successfully");
      }
      this.loading = false;

    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);

    })
  }
  onClickEditSlider(slider) {
    this.slider_obj = JSON.parse(JSON.stringify(slider));
    this.dialogType = 'update';
    this.showAddSliderModal();
  }
  onClickPayDueSlider(slider) {
    this.slider_obj = JSON.parse(JSON.stringify(slider));
    this.dialogType = 'paymentdue';
    this.showAddSliderModal();
  }
  onClickGetPaymentSummarySlider(slider) {
    this.slider_obj = JSON.parse(JSON.stringify(slider));
    localStorage.setItem('slider_id',this.slider_obj.id)
    this.dialogType = 'payment-history';
    this.showHistorySliderModal();
  }

  showHistorySliderModal() {
    this.modalRef = this.modalService.show(MerchantPaymentHistoryComponent, { class: 'add-update-room-path-modal1', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = "";
    this.modalRef.content.dialogType = this.dialogType;
    this.modalRef.content.slider_obj = this.slider_obj;
    var tempSubObj: Subscription = this.modalRef.content.onHide.subscribe(() => {
      if (this.modalRef.content.decision === 'done') {
        if (this.dialogType == "update") {
          for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
            if (this.table_data[i].id == this.modalRef.content.dialogResult.id) {
              this.table_data[i] = this.modalRef.content.dialogResult;
              break;
            }
          }
        }
        if (this.dialogType == "paymentdue") {
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

  showAddSliderModal() {
    if(this.dialogType == 'payment-history') {
      this.modalRef = this.modalService.show(UpdateMerchantModalComponent, { class: 'add-update-room-path-modal1', backdrop: 'static', keyboard: false });  
    } else {
      this.modalRef = this.modalService.show(UpdateMerchantModalComponent, { class: 'add-update-room-path-modal', backdrop: 'static', keyboard: false });
    }
    this.modalRef.content.decision = "";
    this.modalRef.content.dialogType = this.dialogType;
    this.modalRef.content.slider_obj = this.slider_obj;
    var tempSubObj: Subscription = this.modalRef.content.onHide.subscribe(() => {
      if (this.modalRef.content.decision === 'done') {
        if (this.dialogType == "update") {
          for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
            if (this.table_data[i].id == this.modalRef.content.dialogResult.id) {
              this.table_data[i] = this.modalRef.content.dialogResult;
              break;
            }
          }
        }
        if (this.dialogType == "paymentdue") {
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
  exportCurrent(){
    this.loading = true;
    let headerList = ["merchant_name","merchant_phone","merchant_address","licence_proof","address_proof","utility_proof","merchantCreatedAt","planname"]
    this.commonHelper.downloadFile(this.table_data,"Merchant Request", headerList);
    this.loading = false;
  }
  exportAll(){
    let params = {
      filters: {}
    };
    if(this.filters.searchtext) {
      params["filters"]["searchtext"] = this.filters.searchtext.trim();
    }
    if (this.filters.from_date) {
      params["filters"]["from_date"] = this.filters.from_date;
    }
    if (this.filters.to_date) {
      params["filters"]["to_date"] = this.filters.to_date;
    }
    this.loading = true;
    this.merchantService.exportAllMerchant(params).subscribe((res: any) => {
      if (res.status == 200 && res.data) {
        let headerList = ["merchant_name","merchant_phone","merchant_address","licence_proof","address_proof","utility_proof","merchantCreatedAt","planname"]


        this.commonHelper.downloadFile(JSON.parse(JSON.stringify(res.data)),"Merchant Request All", headerList);

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

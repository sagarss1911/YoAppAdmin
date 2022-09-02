import { Component, OnInit } from '@angular/core';
import { MerchantService } from 'src/app/services/merchant.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { UpdateMerchantModalComponent } from 'src/app/merchant/merchant/merchant-management/merchant-edit-modal/merchant-edit-modal.component';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MerchantPaymentHistoryComponent } from 'src/app/merchant/merchant/merchant-management/merchant-payment-history/merchant-payment-history.component';
import { MerchantResetImagesModalComponent } from 'src/app/merchant/merchant/merchant-management/merchant-reset-images/merchant-reset-images-modal.component';
import { remove } from 'lodash-es';
@Component({
  selector: 'merchant-reuploaded-images-management',
  templateUrl: './merchant-reuploaded-images-management.component.html',
  styleUrls: ['./merchant-reuploaded-images-management.component.css']
})
export class  MerchantReuploadedImagesManagementComponent implements OnInit {
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
        limit: event.limit ? event.limit : this.recordLimit,
        isReuploaded: 1
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

  onClickAcceptChanges(data){
    this.loading = true;
    this.merchantService.acceptImageChangeRequest(data.id).subscribe((res: any) => {
      if (res.status == 200) {
        remove(this.table_data, (ub: any) => ub.id == data.id);
        this._toastMessageService.alert("success","Request Accepted Successfully");

      }
      this.loading = false;

    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);

    })
  }

  onClickResetImages(slider) {
    this.slider_obj = JSON.parse(JSON.stringify(slider));
    this.dialogType = 'update';
    this.showResetImagesModal();
  }
  showResetImagesModal() {
    this.modalRef = this.modalService.show(MerchantResetImagesModalComponent, { class: 'add-update-room-path-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = "";
    this.modalRef.content.dialogType = this.dialogType;
    this.modalRef.content.slider_obj = this.slider_obj;
    var tempSubObj: Subscription = this.modalRef.content.onHide.subscribe(() => {
      if (this.modalRef.content.decision === 'done') {
        for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
          if (this.table_data[i].id == this.modalRef.content.dialogResult.id) {
            this.table_data[i] = this.modalRef.content.dialogResult;
            break;
          }
        }
      }
      tempSubObj.unsubscribe();
    });
  }





}

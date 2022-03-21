import { Component, OnInit, ViewChild } from '@angular/core';
import { BankTransferService } from 'src/app/services/bank_transfer.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'bank-transfer-management',
  templateUrl: './bank-transfer-management.component.html',
  styleUrls: ['./bank-transfer-management.component.css']
})
export class  BankTransferManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters:any = {};
  public setting_Obj: any = {}
  todayDate = new Date();
  base_url = environment.url;
  public dialogType: string = "add";
  status : boolean = true

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private bankTransferService: BankTransferService, private commonHelper: CommonHelper,
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
        params["filters"]["searchtext"] = this.filters.searchtext.trim();
      }
      if (this.filters.from_date) {
        params["filters"]["from_date"] = this.filters.from_date;
      }
      if (this.filters.to_date) {
        params["filters"]["to_date"] = this.filters.to_date;
      }
      this.bankTransferService.getAllBankDetails(params).subscribe((res: any) => {
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

  onClickStatusChange(data){
    this.loading = true;
    let newStatus = data.status == "pending" ? "completed" : "pending";
    this.bankTransferService.updateStatusBankRequest(data.id,{ newStatus: newStatus }).subscribe((res: any) => {
      if (res.status == 200) {
        data.status = newStatus;
        this._toastMessageService.alert("success","Status Updated Successfully");
      }
      this.loading = false;

    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);

    })
  }

  exportCurrent(){
    this.loading = true;
    let headerList = ["address","amount","bank_account","bank_name","country","email","name","phone",'status','transaction_id','createdAt']
    this.commonHelper.downloadFile(this.table_data,"Bank Transfer Request", headerList);
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
    this.bankTransferService.exportAllBankRequest(params).subscribe((res: any) => {
      if (res.status == 200 && res.data) {

        let headerList = ["address","amount","bank_account","bank_name","country","email","name","phone",'status','transaction_id','createdAt']
        this.commonHelper.downloadFile(JSON.parse(JSON.stringify(res.data)),"Support Transfer Request All", headerList);

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

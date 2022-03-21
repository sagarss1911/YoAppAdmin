import { Component, OnInit, ViewChild } from '@angular/core';
import { SupportRequestService } from 'src/app/services/support_request.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'support-request-management',
  templateUrl: './support-request-management.component.html',
  styleUrls: ['./support-request-management.component.css']
})
export class SupportRequestManagementComponent implements OnInit {
  public loading: boolean = false;

  public setting_Obj: any = {}

  base_url = environment.url;
  public dialogType: string = "add";
  status: boolean = true
  todayDate = new Date();
  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public filters: any = {};

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private supportRequestService: SupportRequestService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getSlidersWithFilters({ page: 1 });
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
      this.supportRequestService.getAllSupportRequest(params).subscribe((res: any) => {
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

  onClickStatusChange(data) {
    this.loading = true;
    this.supportRequestService.updateStatusSupportRequest(data.id,{ newStatus: !data.status }).subscribe((res: any) => {
      if (res.status == 200) {
        data.status = !data.status;
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
    let headerList = ["email","name","phone","status","text","title",'createdAt']
    this.table_data = this.table_data.map((m:any) => {return {...m, status: m.status == 1 ? "Resolved" : "Pending"}})
    this.commonHelper.downloadFile(this.table_data,"Support Request", headerList);
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
    this.supportRequestService.exportAllSupportRequest(params).subscribe((res: any) => {
      if (res.status == 200 && res.data) {

        let headerList = ["email","name","phone","status","text","title",'createdAt']
        this.commonHelper.downloadFile(JSON.parse(JSON.stringify(res.data)),"Support Request All", headerList);

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

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
  status : boolean = true

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public filters:any = {};

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
        params["filters"]["searchtext"] = this.filters.searchtext;
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

  onClickStatusChange(data){
    console.log(data)
    if(data.status == 1){
      this.status = false

    } else {
      this.status = true
    }
  }

  onClickDeleteSlider(slider) {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, { class: 'confirmation-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = '';
    this.modalRef.content.confirmation_text = "Are you sure to delete this FAQ?"
    var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
      if (this.modalRef.content.decision == "done") {
        this.loading = true;
        this.supportRequestService.deleteSupportRequest(slider.id).subscribe((res: any) => {
          this.loading = false;
          if (res.status == 200) {
            remove(this.table_data, (ub: any) => ub.id == slider.id);
            this._toastMessageService.alert("success", "FAQS deleted successfully.");
          }
        }, (error) => {
          this.loading = false;
          this.commonHelper.showError(error);
        });
      }
      tempSubObj.unsubscribe();
    });
  }
}

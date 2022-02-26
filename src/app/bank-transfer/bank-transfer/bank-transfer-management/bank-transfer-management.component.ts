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

  base_url = environment.url;
  public dialogType: string = "add";
  status : boolean = true

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private BankTransferService: BankTransferService, private commonHelper: CommonHelper,
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
      this.BankTransferService.getAllBankDetails(params).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
          this.table_data = [];
          this.table_data = JSON.parse(JSON.stringify(res.data));
          console.log(this.table_data)
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
    if(data){
      this.status = false

    } else {
      this.status =true
    }
  }

  onClickDeleteSlider(slider) {
    // this.modalRef = this.modalService.show(ConfirmationModalComponent, { class: 'confirmation-modal', backdrop: 'static', keyboard: false });
    // this.modalRef.content.decision = '';
    // this.modalRef.content.confirmation_text = "Are you sure to delete this FAQ?"
    // var tempSubObj: Subscription = this.modalService.onHide.subscribe(() => {
    //   if (this.modalRef.content.decision == "done") {
    //     this.loading = true;
    //     this.BankTransferService.deleteSupportCategory(slider.id).subscribe((res: any) => {
    //       this.loading = false;
    //       if (res.status == 200) {
    //         remove(this.table_data, (ub: any) => ub.id == slider.id);
    //         this._toastMessageService.alert("success", "FAQS deleted successfully.");
    //       }
    //     }, (error) => {
    //       this.loading = false;
    //       this.commonHelper.showError(error);
    //     });
    //   }
    //   tempSubObj.unsubscribe();
    // });
  }
}

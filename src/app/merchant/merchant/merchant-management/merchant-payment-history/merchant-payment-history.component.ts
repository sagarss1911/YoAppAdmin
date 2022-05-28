import { Component, OnInit } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MerchantService } from 'src/app/services/merchant.service';
import { environment } from "src/environments/environment";
import { Subject } from 'rxjs';
@Component({
  selector: 'app-merchant-payment-history',
  templateUrl: './merchant-payment-history.template.html',
  styleUrls: ['./merchant-payment-history.component.css']
})

export class MerchantPaymentHistoryComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  slider_obj: any;
  dialogResult: any;
  public recordLimit: number = 10;
  public filters:any = {};
  public table_data: any[] = [];
  data: string;
  slider_id : any;
  public paginationValues: Subject<any> = new Subject();
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper,   private merchantService: MerchantService) { super(modalRef); }

  ngOnInit() {
    this.slider_id = (localStorage.getItem('slider_id'))
    if(this.slider_id) {
      this.getSlidersWithFilters({ page: 1 });
    }
  }

  onClose() {
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }

  getSlidersWithFilters(event) {
    this.loading = true;
    return new Promise((resolve, reject) => {
      let params = {
        filters: {},
        page: event.page,
        limit: event.limit ? event.limit : this.recordLimit,
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
      this.merchantService.getAllMerchantPaymentHistory(this.slider_id,params).subscribe((res: any) => {
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

  onTagChange(event) {
    this.slider_obj.tag = event.name;
  }
}

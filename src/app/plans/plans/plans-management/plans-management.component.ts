import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { EditPlanModalComponent } from 'src/app/plans/plans/plans-management/edit-plan-modal/edit-plan-modal.component';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'plans-management',
  templateUrl: './plans-management.component.html',
  styleUrls: ['./plans-management.component.css']
})
export class  PlansManagementComponent implements OnInit {
  public loading: boolean = false;
  public filters:any = {};
  public setting_Obj: any = {}
  todayDate = new Date();
  base_url = environment.url;
  public dialogType: string = "add";
  status : boolean = true

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public slider_obj: any = {}
  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private plansService: PlansService, private commonHelper: CommonHelper,
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

      this.plansService.getAllPlans(params).subscribe((res: any) => {
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
  onClickAddSlider() {
    this.slider_obj = {
      id: null,
    };

    this.dialogType = 'add';
    this.showAddSliderModal();
  }
  onClickStatusChange(data){
    this.loading = true;
    this.plansService.updateDefaultPlan(data.id,{}).subscribe((res: any) => {
      if (res.status == 200) {
        for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
          this.table_data[i].isDefault = 0
        }
        data.isDefault = 1;
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
  showAddSliderModal() {
    this.modalRef = this.modalService.show(EditPlanModalComponent, { class: 'add-update-room-path-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = "";
    this.modalRef.content.dialogType = this.dialogType;
    this.modalRef.content.slider_obj = this.slider_obj;
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


}

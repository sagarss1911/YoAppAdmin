import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { remove } from 'lodash-es';
import { Subscription, Subject } from 'rxjs';
import { environment } from "src/environments/environment";
import { AddUpdatePermissionModalComponent } from 'src/app/permission/permission/permission-management/add-update-permission-modal/add-update-permission-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from 'src/app/modals/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'permission-management',
  templateUrl: './permission-management.component.html',
  styleUrls: ['./permission-management.component.css']
})
export class PermissionManagementComponent implements OnInit {
  public loading: boolean = false;

  public permission_Obj: any = {}

  base_url = environment.url;
  public dialogType: string = "add";
  permissions: any = [];

  public paginationValues: Subject<any> = new Subject();
  public table_data: any[] = [];
  public filters:any = {};

  public recordLimit: number = 10;
  public modalRef: BsModalRef;
  constructor(private permissionService: PermissionService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.permissions = localStorage.permission
    if(this.permissions.includes("admin-users")){
    this.getSlidersWithFilters({ page: 1 });
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
        params["filters"]["searchtext"] = this.filters.searchtext;
      }
      this.permissionService.getAllUserList(params).subscribe((res: any) => {
        if (res.status == 200 && res.data) {
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
    this.permission_Obj = {
      id: null,
    };

    this.dialogType = 'add';
    this.showAddSliderModal();
  }
  onClickEditSlider(slider) {
    this.permission_Obj = JSON.parse(JSON.stringify(slider));
    this.permission_Obj.modules = JSON.parse(this.permission_Obj.modules)
    this.dialogType = 'update';
    this.showAddSliderModal();
  }
  onClickStatusChange(slider) {
    this.loading = true;
    let newStatus = !slider.isEnabled;
    this.permissionService.statusChange(slider.id,{ newStatus: newStatus }).subscribe((res: any) => {
      if (res.status == 200) {
        slider.isEnabled = newStatus;
        this._toastMessageService.alert("success","Status Updated Successfully");
      }
      this.loading = false;

    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);

    })


  }
  showAddSliderModal() {
    this.modalRef = this.modalService.show(AddUpdatePermissionModalComponent, { class: 'add-update-faq-modal', backdrop: 'static', keyboard: false });
    this.modalRef.content.decision = "";
    this.modalRef.content.dialogType = this.dialogType;
    this.modalRef.content.permission_Obj = this.permission_Obj;
    var tempSubObj: Subscription = this.modalRef.content.onHide.subscribe(() => {
      if (this.modalRef.content.decision === 'done') {
        if (this.dialogType == "add") {
          this.table_data.unshift(JSON.parse(JSON.stringify(this.modalRef.content.dialogResult)));
        } else if (this.dialogType == "update") {
          for (var i = 0, fLen = this.table_data.length; i < fLen; i++) {
            if (this.table_data[i].id == this.modalRef.content.dialogResult.id) {
              console.log(this.modalRef.content.dialogResult.modules)
              this.table_data[i].modules = JSON.stringify( this.modalRef.content.dialogResult.modules);
              break;
            }
          }
        }
      }
      tempSubObj.unsubscribe();
    });

  }

}

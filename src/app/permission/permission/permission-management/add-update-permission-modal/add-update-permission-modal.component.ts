import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { PermissionService } from 'src/app/services/permission.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from "src/environments/environment";
@Component({
  selector: 'add-update-permission-modal',
  templateUrl: './add-update-permission-modal.template.html',
  styleUrls: ['./add-update-permission-modal.component.css']
})

export class AddUpdatePermissionModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  setting_Obj: any;
  permission_Obj: any = [];
  dialogResult: any;
  permission_url_list = []
  newImageUploaded: boolean = false;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    
  }
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private permissionService: PermissionService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {
    this.getAllPermissionUrl();
  }

  onClose() {
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }

  getAllPermissionUrl() {
    this.loading = true;
    this.permissionService.getAllPermissionUrlList().subscribe((res: any) => {
      this.loading = true;
      if (res.status == 200 && res.data) {
        this.loading = false;
        let allPermissionUrl = []
        res.data.forEach(x => {
          allPermissionUrl.push({name:x , value:x})
        })
        this.permission_url_list = allPermissionUrl.length ? allPermissionUrl : []

      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

  addSupportCategory() {
    let params = {
      name: this.permission_Obj.name,
      url: this.permission_Obj.url
    }
    this.loading = true;
    this.permissionService.addPermission(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        let result = {};

        this._toastMessageService.alert("success", "Support category added successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }


  updateSupportCategory(){
    let params = {
      name: this.permission_Obj.name,
      url: this.permission_Obj.url
    }
    this.loading = true;
    this.permissionService.updatePermission(this.permission_Obj.id,params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "updated successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

}

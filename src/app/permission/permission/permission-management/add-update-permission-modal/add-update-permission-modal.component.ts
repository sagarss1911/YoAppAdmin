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
  permission_url_list = [{name:'Dashboard',value:'dashboard'},{name:'Admin Users',value:'admin-users'},
  {name:'FAQ',value:'faqs'},
  {name:'Legal',value:'legal'},
  {name:'Support Category',value:'support-category'},
  {name:'Support Request',value:'support-request'},
  {name:'Bank Transfer',value:'bank-transfer'},
  {name:'Cash Pickup',value:'cash-pickup'},
  {name:'Merchant',value:'merchant'},
  {name:'Merchant Plans',value:'plans'},
  {name:'Merchant Bank Transfer',value:'bank-transfer-merchant'},
  {name:'Merchant Cashpickup',value:'cash-pickup-merchant'},
  {name:'User CashTopup',value:'cash-topup'},
]
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

  }

  onClose() {
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }



  addSupportCategory() {
    let params = {
      email: this.permission_Obj.email,
      password: this.permission_Obj.password,
      modules: this.permission_Obj.modules
    }
    this.loading = true;
    this.permissionService.addUser(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {


        this._toastMessageService.alert("success", "User added successfully.");
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
      modules: this.permission_Obj.modules,
      resetpassword: this.permission_Obj.resetpassword,
      password: this.permission_Obj.resetpassword ? this.permission_Obj.password : 0,

    }
    this.loading = true;
    this.permissionService.updateUser(this.permission_Obj.id,params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "User updated successfully.");
        this.dialogResult = {id:this.permission_Obj.id,modules:this.permission_Obj.modules};
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

}

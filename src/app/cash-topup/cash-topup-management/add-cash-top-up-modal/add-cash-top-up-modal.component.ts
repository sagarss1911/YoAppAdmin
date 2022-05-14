import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { CashTopupService } from 'src/app/services/cash_topup.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from "src/environments/environment";
@Component({
  selector: 'add-cash-top-up-modal',
  templateUrl: './add-cash-top-up-modal.template.html',
  styleUrls: ['./add-cash-top-up-modal.component.css']
})

export class AddCashTopupModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  setting_Obj: any;
  users_data: any = [];
  dialogResult: any;
  newImageUploaded: boolean = false;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',

  }
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private cashTopupService: CashTopupService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

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

  addCashTopup() {
    let params = {
      user: this.setting_Obj.selectedUser,
      amount: this.setting_Obj.amount,
    }
    this.loading = true;
    this.cashTopupService.addBalanceToUserWallet(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Cash Topup successfully Completed.");
        this.dialogResult = res.data[0];
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }


  updateSupportCategory(){
    // let params = {
    //   title: this.setting_Obj.title,
    // }
    // this.loading = true;
    // this.cashTopupService.updateSupportCategory(this.setting_Obj.id,params).subscribe((res: any) => {
    //   this.loading = false;
    //   if (res.status == 200 && res.data) {
    //     this._toastMessageService.alert("success", "updated successfully.");
    //     this.dialogResult = res.data;
    //     this.done();
    //   }
    // }, (error) => {
    //   this.loading = false;
    //   this.commonHelper.showError(error);
    // })
  }

}

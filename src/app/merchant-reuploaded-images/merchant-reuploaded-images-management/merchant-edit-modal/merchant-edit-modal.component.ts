import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';

import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MerchantService } from 'src/app/services/merchant.service';
import { PlansService } from 'src/app/services/plans.service';
import { environment } from "src/environments/environment";
import { Subscription, Subject } from 'rxjs';
@Component({
  selector: 'update-merchant-modal',
  templateUrl: './merchant-edit-modal.template.html',
  styleUrls: ['./merchant-edit-modal.component.css']
})

export class UpdateMerchantModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  slider_obj: any;
  main_product_list = []
  product_options_list = []
  collection_data = []
  dialogResult: any;
  planList = []
  newvalid_IDImageUploaded: boolean = false;
  newAddressImageUploaded: boolean = false;
  newTINCardImageUploaded: boolean = false;
  @ViewChild('valid_ID_File') valid_ID_File: any;
  @ViewChild('address_proof_File') address_proof_File: any;
  @ViewChild('TIN_card_File') TIN_card_File: any;
  public paginationValues: Subject<any> = new Subject();
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private plansService: PlansService,  private merchantService: MerchantService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {
    this.getPlans()
  }

  onClose() {
    this.slider_obj = ''
    this.decision = '';
    this.close(true);
  }

  done() {
    this.decision = 'done';
    this.close(true);
  }



  getPlans() {
    this.loading = true;
    this.plansService.getAllPlansForDropdown().subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this.planList = res.data;
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }


  updateSlider(){
    const data = new FormData();
    if(this.newvalid_IDImageUploaded){
      data.append('valid_ID', this.slider_obj.valid_ID_File);
    }
    if(this.newTINCardImageUploaded){
      data.append('TIN_card', this.slider_obj.TIN_card_File);
    }
    if(this.newAddressImageUploaded){
      data.append('address_proof', this.slider_obj.address_proof_File);
    }

    let params = {
      merchant_name: this.slider_obj.merchant_name,
      merchant_address: this.slider_obj.merchant_address,
      merchant_phone: this.slider_obj.merchant_phone,
      membershipId: this.slider_obj.membershipId,
      cash_topup_limit: this.slider_obj.cash_topup_limit,
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.merchantService.updateMerchantProfile(this.slider_obj.id,data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Merchant updated successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

  updateDuePaymentSlider() {
    let params = {
      amount_due: this.slider_obj.amount_due,
      amount_paid: this.slider_obj.amount_paid
    }
    this.loading = true;
    this.merchantService.updateMerchantDuePayment(this.slider_obj.id,params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Merchant due payment updated successfully.");
        this.slider_obj.merchant_due_payment = res.data.total_pending
        this.dialogResult = this.slider_obj;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }


  onTagChange(event) {
    this.slider_obj.tag = event.name;
  }

  clearvalid_IDCLFile() {
    this.valid_ID_File.nativeElement.value = '';
    this.slider_obj.valid_ID_Url = '';
    this.slider_obj.valid_ID_File = null;
    this.newvalid_IDImageUploaded = false;
  }

  onvalid_IDCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newvalid_IDImageUploaded = true;
      this.slider_obj.valid_ID_Url = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.valid_ID_File = event.target.files[0];
    }
  }

  clearAddressCLFile() {
    this.address_proof_File.nativeElement.value = '';
    this.slider_obj.address_proof_Url = '';
    this.slider_obj.address_proof_File = null;
    this.newAddressImageUploaded = false;
  }

  onAddressCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newAddressImageUploaded = true;
      this.slider_obj.address_proof_Url = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.address_proof_File = event.target.files[0];
    }
  }
  clearTINCardCLFile() {
    this.TIN_card_File.nativeElement.value = '';
    this.slider_obj.TIN_card_Url = '';
    this.slider_obj.TIN_card_File = null;
    this.newTINCardImageUploaded = false;
  }

  onTINCardCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newTINCardImageUploaded = true;
      this.slider_obj.TIN_card_Url = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.TIN_card_File = event.target.files[0];
    }
  }
}

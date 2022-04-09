import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';

import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MerchantService } from 'src/app/services/merchant.service';
import { environment } from "src/environments/environment";
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
  newLicenceImageUploaded: boolean = false;
  newAddressImageUploaded: boolean = false;
  newUtilityImageUploaded: boolean = false;
  @ViewChild('licence_proof_File') licence_proof_File: any;
  @ViewChild('address_proof_File') address_proof_File: any;
  @ViewChild('utility_proof_File') utility_proof_File: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper,  private merchantService: MerchantService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

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




  updateSlider(){
    const data = new FormData();
    if(this.newLicenceImageUploaded){
      data.append('licence_proof', this.slider_obj.licence_proof_File);
    }
    if(this.newUtilityImageUploaded){
      data.append('utility_proof', this.slider_obj.utility_proof_File);
    }
    if(this.newAddressImageUploaded){
      data.append('address_proof', this.slider_obj.address_proof_File);
    }

    let params = {
      merchant_name: this.slider_obj.merchant_name,
      merchant_address: this.slider_obj.merchant_address,
      merchant_phone: this.slider_obj.merchant_phone
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
  onTagChange(event) {
    this.slider_obj.tag = event.name;
  }

  clearLicenceCLFile() {
    this.licence_proof_File.nativeElement.value = '';
    this.slider_obj.licence_proof_Url = '';
    this.slider_obj.licence_proof_File = null;
    this.newLicenceImageUploaded = false;
  }

  onLicenceCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newLicenceImageUploaded = true;
      this.slider_obj.licence_proof_Url = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.licence_proof_File = event.target.files[0];
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
  clearUtilityCLFile() {
    this.utility_proof_File.nativeElement.value = '';
    this.slider_obj.utility_proof_Url = '';
    this.slider_obj.utility_proof_File = null;
    this.newUtilityImageUploaded = false;
  }

  onUtilityCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newUtilityImageUploaded = true;
      this.slider_obj.utility_proof_Url = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.utility_proof_File = event.target.files[0];
    }
  }
}

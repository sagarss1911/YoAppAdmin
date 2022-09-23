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
  selector: 'merchant-reset-images-modal',
  templateUrl: './merchant-reset-images-modal.template.html',
  styleUrls: ['./merchant-reset-images-modal.component.css']
})

export class MerchantResetImagesModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  slider_obj: any;
  main_product_list = []
  product_options_list = []
  collection_data = []
  dialogResult: any;
  imagesList = [{id:"valid_ID",name:"Licence"},{id:"address_proof",name:"Address"},{id:"TIN_card",name:"TIN Card"},
  {id:"upgraded_image1",name:"Extra Uploaded 1"},{id:"upgraded_image2",name:"Extra Uploaded 2"},{id:"upgraded_image3",name:"Extra Uploaded 3"},{id:"upgraded_image4",name:"Extra Uploaded 4"}]


  public paginationValues: Subject<any> = new Subject();
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private plansService: PlansService,  private merchantService: MerchantService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

  ngOnInit() {

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





  updateSlider(){
    let params = {
      selected_fields: this.slider_obj.selectedFields
    }
    this.loading = true;
    this.merchantService.resetMerchantImages(this.slider_obj.id,params).subscribe((res: any) => {
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















}

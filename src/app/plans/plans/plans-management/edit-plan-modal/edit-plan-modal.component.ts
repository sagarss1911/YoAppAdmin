import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';

import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PlansService } from 'src/app/services/plans.service';
import { environment } from "src/environments/environment";
@Component({
  selector: 'edit-plan-modal',
  templateUrl: './edit-plan-modal.template.html',
  styleUrls: ['./edit-plan-modal.component.css']
})

export class EditPlanModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  slider_obj: any;
  main_product_list = []
  product_options_list = []
  collection_data = []
  dialogResult: any;
  newPlanImageUploaded: boolean = false;

  @ViewChild('plan_File') plan_File: any;

  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper,  private plansService: PlansService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

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



  addSlider(){
    const data = new FormData();
    if(this.newPlanImageUploaded){
      data.append('plan_image', this.slider_obj.plan_File);
    }

    let params = {
      planname: this.slider_obj.planname,
      cash_pickup_limit: this.slider_obj.cash_pickup_limit,
      cash_topup_limit: this.slider_obj.cash_topup_limit
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.plansService.addPlan(data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Plan Created Successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
  updateSlider(){
    const data = new FormData();
    if(this.newPlanImageUploaded){
      data.append('plan_image', this.slider_obj.plan_File);
    }

    let params = {
      planname: this.slider_obj.planname,
      cash_pickup_limit: this.slider_obj.cash_pickup_limit,
      cash_topup_limit: this.slider_obj.cash_topup_limit
    }
    data.append('body', JSON.stringify(params));
    this.loading = true;
    this.plansService.updatePlan(this.slider_obj.id,data).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Plan updated successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }


  clearPlanCLFile() {
    this.plan_File.nativeElement.value = '';
    this.slider_obj.plan_Url = '';
    this.slider_obj.plan_File = null;
    this.newPlanImageUploaded = false;
  }

  onPlanCLUpload(event) {
    if (event.target.files && event.target.files[0]) {
      this.newPlanImageUploaded = true;
      this.slider_obj.plan_Url = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(event.target.files[0])
      );
      this.slider_obj.plan_File = event.target.files[0];
    }
  }


}

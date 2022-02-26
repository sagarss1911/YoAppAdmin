import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseModalComponent } from 'src/app/modals/base-modal.component';
import { FaqsService } from 'src/app/services/faqs.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from "src/environments/environment";
@Component({
  selector: 'add-update-faqs-modal',
  templateUrl: './add-update-faqs-modal.template.html',
  styleUrls: ['./add-update-faqs-modal.component.css']
})

export class AddUpdateFaqsModalComponent extends BaseModalComponent implements OnInit {

  base_url = environment.url;
  loading: boolean = false;
  decision: string = '';
  dialogType: string = "";
  setting_Obj: any;
  dialogResult: any;
  newImageUploaded: boolean = false;
  config = {
    placeholder: '',
    tabsize: 2,
    height: '200px',
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo']],
      ['style', ['bold', 'italic', 'underline', 'clear']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
      ['fontsize', ['fontsize']],
      ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'hr']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
  @ViewChild('sliderImageFile') sliderImageFile: any;
  constructor(public modalRef: BsModalRef, private _toastMessageService: ToastMessageService,
    private commonHelper: CommonHelper, private faqsService: FaqsService, private modalService: BsModalService,private sanitizer: DomSanitizer) { super(modalRef); }

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

  addFaqs() {
    let params = {
      question: this.setting_Obj.question,
      answer: this.setting_Obj.answer,
      seotitle: this.setting_Obj.seotitle,
      seodescription: this.setting_Obj.seodescription,
      seokeyword: this.setting_Obj.seokeyword,
    }
    this.loading = true;
    this.faqsService.addFaqs(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "FAQs added successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }


  updateFaqs(){
    let params = {
      question: this.setting_Obj.question,
      answer: this.setting_Obj.answer,
      seotitle: this.setting_Obj.seotitle,
      seodescription: this.setting_Obj.seodescription,
      seokeyword: this.setting_Obj.seokeyword,
    }
    this.loading = true;
    this.faqsService.updateFaqs(this.setting_Obj.id,params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "FAQs updated successfully.");
        this.dialogResult = res.data;
        this.done();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }

}

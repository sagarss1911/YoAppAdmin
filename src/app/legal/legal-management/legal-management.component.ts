import { Component, OnInit, ViewChild } from '@angular/core';
import { LegalService } from 'src/app/services/legal.service';
import { CommonHelper } from 'src/app/helpers/common.helper';
import { ToastMessageService } from 'src/app/services/toast-message.service';
import { environment } from "src/environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'legal-management',
  templateUrl: './legal-management.component.html',
  styleUrls: ['./legal-management.component.css']
})
export class LegalManagementComponent implements OnInit {
  loading: boolean = false;
  hide: boolean = false;
  commondata: any;
  setting_Obj: any = {};
  data: any;
  editformdata = false;
  base_url = environment.url;
  permissions: any = [];
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

  constructor(private legalService: LegalService, private commonHelper: CommonHelper,
    private _toastMessageService: ToastMessageService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {

this.permissions = localStorage.permission
if(this.permissions.includes("legal")){
    this.getData();
}

  }

  getData() {
    return new Promise((resolve, reject) => {
      this.legalService.getLegal({content: "legal"}).subscribe(
        (res: any) => {
          if (res.status == 200 && res.data) {

            this.setting_Obj = JSON.parse(JSON.stringify(res.data));
          }
          else {
            this.editformdata = true;
          }
          return resolve(true);
        },
        (error) => {
          this.commonHelper.showError(error);
          return resolve(false);
        }
      );
    });
  }

  addTermCondition() {
    let params = {
      content: "legal",
      option_value: this.setting_Obj.option_value,
    }
    this.loading = true;
    this.legalService.addLegal(params).subscribe((res: any) => {
      this.loading = false;
      if (res.status == 200 && res.data) {
        this._toastMessageService.alert("success", "Legal data updated successfully.");
        this.editformdata = false;
        this.getData();
      }
    }, (error) => {
      this.loading = false;
      this.commonHelper.showError(error);
    })
  }
}





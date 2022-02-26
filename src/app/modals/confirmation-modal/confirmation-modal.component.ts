import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BaseModalComponent } from '../base-modal.component';

declare var $ : any

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.template.html',
  styleUrls: ['./confirmation-modal.component.css']
})

export class ConfirmationModalComponent extends BaseModalComponent implements OnInit {
  decision: string = '';
  type: any;
  confirmation_text: string = '';
  constructor(public modalRef: BsModalRef) { super(modalRef); }
  
  ngOnInit() {    
  }

  onClose() {
    this.decision='';
    this.close(true);    
  }
  
  done(){  
    this.decision='done';
    this.close(true);    
  }
}
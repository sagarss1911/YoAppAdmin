import { NgModule } from '@angular/core';
import { FaqsManagementComponent } from './faqs/faqs-management/faqs-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { FaqsRoutingModule } from './faqs-routing.module';
import { AddUpdateFaqsModalComponent } from './faqs/faqs-management/add-update-faqs-modal/add-update-faqs-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    FaqsManagementComponent,
    AddUpdateFaqsModalComponent
  ],
  imports: [
    SharedModule,
    FaqsRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [
  	AddUpdateFaqsModalComponent
  ],
})
export class FaqsModule {}

import { NgModule } from '@angular/core';
import { MerchantManagementComponent } from './merchant/merchant-management/merchant-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { MerchantRoutingModule } from './merchant-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
import { UpdateMerchantModalComponent } from './merchant/merchant-management/merchant-edit-modal/merchant-edit-modal.component';
import { MerchantPaymentHistoryComponent } from './merchant/merchant-management/merchant-payment-history/merchant-payment-history.component';
import { MerchantResetImagesModalComponent } from './merchant/merchant-management/merchant-reset-images/merchant-reset-images-modal.component';

@NgModule({
  declarations: [
    MerchantManagementComponent,
    UpdateMerchantModalComponent,
    MerchantPaymentHistoryComponent,
    MerchantResetImagesModalComponent
  ],
  imports: [
    SharedModule,
    MerchantRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [
    UpdateMerchantModalComponent,
    MerchantResetImagesModalComponent
  ],
})
export class  MerchantModule {}

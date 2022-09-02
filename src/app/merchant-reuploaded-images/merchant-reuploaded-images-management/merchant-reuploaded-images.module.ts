import { NgModule } from '@angular/core';
import { MerchantReuploadedImagesManagementComponent } from './merchant-reuploaded-images-management.component';
import { SharedModule } from './../../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { MerchantReuploadImagesRoutingModule } from './merchant-reuploaded-images-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
import { MerchantResetImagesModalComponent } from './merchant-reset-images/merchant-reset-images-modal.component';

@NgModule({
  declarations: [
    MerchantReuploadedImagesManagementComponent,
    MerchantResetImagesModalComponent
  ],
  imports: [
    SharedModule,
    MerchantReuploadImagesRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [
    MerchantResetImagesModalComponent
  ],
})
export class  MerchantReuploadedRoutingModule {}

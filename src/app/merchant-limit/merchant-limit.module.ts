import { NgModule } from '@angular/core';
import { MerchantLimitManagementComponent } from './merchant-limit-management/merchant-limit-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { MerchantLimitRoutingModule } from './merchant-limit-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MerchantLimitManagementComponent
  ],
  imports: [
    SharedModule,
    MerchantLimitRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class MerchantLimitModule {}

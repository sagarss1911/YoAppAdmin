import { NgModule } from '@angular/core';
import { CashPickupMerchantManagementComponent } from './cash-pickup-merchant/cash-pickup-merchant-management/cash-pickup-merchant-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CashPickupMerchantRoutingModule } from './cash-pickup-merchant-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CashPickupMerchantManagementComponent
  ],
  imports: [
    SharedModule,
    CashPickupMerchantRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [],
})
export class  CashPickupMerchantModule {}

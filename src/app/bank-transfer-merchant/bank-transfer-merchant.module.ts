import { NgModule } from '@angular/core';
import { BankTransferMerchantManagementComponent } from './bank-transfer-merchant/bank-transfer-merchant-management/bank-transfer-merchant-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { BankTransferMerchantRoutingModule } from './bank-transfer-merchant-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BankTransferMerchantManagementComponent
  ],
  imports: [
    SharedModule,
    BankTransferMerchantRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [],
})
export class  BankTransferMerchantModule {}

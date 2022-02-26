import { NgModule } from '@angular/core';
import { BankTransferManagementComponent } from './bank-transfer/bank-transfer-management/bank-transfer-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { BankTransferRoutingModule } from './bank-transfer-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    BankTransferManagementComponent
  ],
  imports: [
    SharedModule,
    BankTransferRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [],
})
export class  BankTransferModule {}

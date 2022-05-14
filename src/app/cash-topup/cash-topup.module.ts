import { NgModule } from '@angular/core';
import { CashTopupManagementComponent } from './cash-topup-management/cash-topup-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CashtopupRoutingModule } from './cash-topup-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
import { AddCashTopupModalComponent } from './cash-topup-management/add-cash-top-up-modal/add-cash-top-up-modal.component';
@NgModule({
  declarations: [
    CashTopupManagementComponent,
    AddCashTopupModalComponent
  ],
  imports: [
    SharedModule,
    CashtopupRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [AddCashTopupModalComponent],
})
export class  CashtopupModule {}

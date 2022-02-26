import { NgModule } from '@angular/core';
import { CashPickupManagementComponent } from './cash-pickup/cash-pickup-management/cash-pickup-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CashPickupRoutingModule } from './cash-pickup-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    CashPickupManagementComponent
  ],
  imports: [
    SharedModule,
    CashPickupRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [],
})
export class  CashPickupModule {}

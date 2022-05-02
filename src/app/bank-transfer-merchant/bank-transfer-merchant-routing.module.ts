import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankTransferMerchantManagementComponent } from './bank-transfer-merchant/bank-transfer-merchant-management/bank-transfer-merchant-management.component';


const routes: Routes = [
	{
		path: '', component: BankTransferMerchantManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  BankTransferMerchantRoutingModule {}

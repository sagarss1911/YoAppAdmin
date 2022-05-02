import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashPickupMerchantManagementComponent } from './cash-pickup-merchant/cash-pickup-merchant-management/cash-pickup-merchant-management.component';


const routes: Routes = [
	{
		path: '', component: CashPickupMerchantManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  CashPickupMerchantRoutingModule {}

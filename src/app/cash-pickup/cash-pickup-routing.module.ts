import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashPickupManagementComponent } from './cash-pickup/cash-pickup-management/cash-pickup-management.component';


const routes: Routes = [
	{
		path: '', component: CashPickupManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  CashPickupRoutingModule {}

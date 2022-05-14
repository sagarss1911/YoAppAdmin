import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CashTopupManagementComponent } from './cash-topup-management/cash-topup-management.component';


const routes: Routes = [
	{
		path: '', component: CashTopupManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  CashtopupRoutingModule {}

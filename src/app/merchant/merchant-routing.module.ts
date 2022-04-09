import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantManagementComponent } from './merchant/merchant-management/merchant-management.component';


const routes: Routes = [
	{
		path: '', component: MerchantManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  MerchantRoutingModule {}

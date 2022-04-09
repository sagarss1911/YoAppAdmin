import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantLimitManagementComponent } from './merchant-limit-management/merchant-limit-management.component';


const routes: Routes = [
	{
		path: '', component: MerchantLimitManagementComponent,
		// children: [
		// 	{ path: '', redirectTo: '/homeslider', pathMatch: 'full' },
    //   { path: 'homeslider', component: HomeSliderManagementComponent},

		// ]
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MerchantLimitRoutingModule {}

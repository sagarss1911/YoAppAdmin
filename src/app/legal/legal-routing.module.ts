import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LegalManagementComponent } from './legal-management/legal-management.component';


const routes: Routes = [
	{
		path: '', component: LegalManagementComponent,
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
export class LegalRoutingModule {}

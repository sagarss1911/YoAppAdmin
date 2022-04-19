import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlansManagementComponent } from './plans-management/plans-management.component';


const routes: Routes = [
	{
		path: '', component: PlansManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  PlansRoutingModule {}

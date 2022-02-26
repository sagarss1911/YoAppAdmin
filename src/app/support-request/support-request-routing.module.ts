import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportRequestManagementComponent } from './support-request/support-request-management/support-request-management.component';


const routes: Routes = [
	{
		path: '', component: SupportRequestManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  SupportRequestRoutingModule {}

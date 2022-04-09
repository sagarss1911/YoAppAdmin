import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionManagementComponent } from './permission/permission-management/permission-management.component';


const routes: Routes = [
	{
		path: '', component: PermissionManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  PermissionRoutingModule {}

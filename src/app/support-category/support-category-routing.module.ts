import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportCategoryManagementComponent } from './support-category/support-category-management/support-category-management.component';


const routes: Routes = [
	{
		path: '', component: SupportCategoryManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  SupportCategoryRoutingModule {}

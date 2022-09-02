import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MerchantReuploadedImagesManagementComponent } from './merchant-reuploaded-images-management.component';


const routes: Routes = [
	{
		path: '', component: MerchantReuploadedImagesManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  MerchantReuploadImagesRoutingModule {}

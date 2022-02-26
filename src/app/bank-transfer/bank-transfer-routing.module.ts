import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankTransferManagementComponent } from './bank-transfer/bank-transfer-management/bank-transfer-management.component';


const routes: Routes = [
	{
		path: '', component: BankTransferManagementComponent,
	}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class  BankTransferRoutingModule {}

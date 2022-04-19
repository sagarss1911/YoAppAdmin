import { NgModule } from '@angular/core';
import { PlansManagementComponent } from './plans-management/plans-management.component';
import { SharedModule } from '../../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { PlansRoutingModule } from './plans-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
import { EditPlanModalComponent } from './plans-management/edit-plan-modal/edit-plan-modal.component';
@NgModule({
  declarations: [
    PlansManagementComponent,
    EditPlanModalComponent
  ],
  imports: [
    SharedModule,
    PlansRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [
    EditPlanModalComponent
  ],
})
export class  PlansModule {}

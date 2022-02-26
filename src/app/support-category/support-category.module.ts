import { NgModule } from '@angular/core';
import { SupportCategoryManagementComponent } from './support-category/support-category-management/support-category-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { SupportCategoryRoutingModule } from './support-category-routing.module';
import { AddUpdateSupportCategoryModalComponent } from './support-category/support-category-management/add-update-support-category-modal/add-update-support-category-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SupportCategoryManagementComponent,
    AddUpdateSupportCategoryModalComponent
  ],
  imports: [
    SharedModule,
    SupportCategoryRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [
  	AddUpdateSupportCategoryModalComponent
  ],
})
export class  SupportCategoryModule {}

import { NgModule } from '@angular/core';
import { PermissionManagementComponent } from './permission/permission-management/permission-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { PermissionRoutingModule } from './permission-routing.module';
import { AddUpdatePermissionModalComponent } from './permission/permission-management/add-update-permission-modal/add-update-permission-modal.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    PermissionManagementComponent,
    AddUpdatePermissionModalComponent
  ],
  imports: [
    SharedModule,
    NgSelectModule,
    PermissionRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [
  	AddUpdatePermissionModalComponent
  ],
})
export class PermissionModule {}

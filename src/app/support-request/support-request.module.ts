import { NgModule } from '@angular/core';
import { SupportRequestManagementComponent } from './support-request/support-request-management/support-request-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { SupportRequestRoutingModule } from './support-request-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    SupportRequestManagementComponent
  ],
  imports: [
    SharedModule,
    SupportRequestRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule
  ],
  providers: [],
})
export class  SupportRequestModule {}

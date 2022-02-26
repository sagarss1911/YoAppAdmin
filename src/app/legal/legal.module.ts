import { NgModule } from '@angular/core';
import { LegalManagementComponent } from './legal-management/legal-management.component';
import { SharedModule } from '../shared/shared.module';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { LegalRoutingModule } from './legal-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LegalManagementComponent
  ],
  imports: [
    SharedModule,
    LegalRoutingModule,
    SharedPaginationModule,
    NgxLoadingModule,
    FormsModule,
    NgxSummernoteModule,
  ],
  providers: [],
})
export class LegalModule {}

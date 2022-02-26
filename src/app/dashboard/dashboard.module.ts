import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FooterModule } from '../shared-components/footer/footer.module';
import { NgxLoadingModule } from 'ngx-loading';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    FooterModule,
    NgxLoadingModule,
    DropdownModule,
    CalendarModule,
    SharedPaginationModule
  ],
  providers: [
  ]
})
export class DashboardModule {
  constructor(){
  }
}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './notfound/notfound.component';
import { SharedModule } from './shared/shared.module';
import { CommonHelper } from './helpers/common.helper';
import { DatePipe } from '@angular/common';
import { ToastMessageService } from './services/toast-message.service';
import { ToastMessageComponent } from './toast-message/toast-message.component';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PhonePipeModule, PhonePipe } from 'src/app/pipes/phone.pipe';
import { MessagePassService } from 'src/app/services/message-pass.service';
import { HttpConfigInterceptor } from 'src/app/services/httpConfigInterceptor';
import { SharedPaginationModule } from 'src/app/shared-components/shared-pagination/shared-pagination.module';
import { DropdownModule } from 'primeng/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotfoundComponent,
    CommonHelper,
    ToastMessageComponent,
    ConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PhonePipeModule,
    SharedPaginationModule,
    DropdownModule,
    NgSelectModule,
    CalendarModule,
    ModalModule.forRoot()
  ],
  exports: [],
  providers: [
    CommonHelper,
    MessagePassService,
    DatePipe,
    ToastMessageService,
    ConfirmationModalComponent,
    PhonePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

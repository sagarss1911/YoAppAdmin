import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
  	FormsModule,
    ResetPasswordRoutingModule,
    NgxLoadingModule
  ]
})
export class ResetPasswordModule {
  constructor(){

  }
 }

import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule) },
  { path: 'reset-password', loadChildren: () => import('src/app/reset-password/reset-password.module').then(m => m.ResetPasswordModule) },
  {
    path: '', component: NavbarComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'legal', loadChildren: () => import('src/app/legal/legal.module').then(m => m.LegalModule) },
      { path: 'faqs', loadChildren: () => import('src/app/faqs/faqs.module').then(m => m.FaqsModule) },
      { path: 'support-category', loadChildren: () => import('src/app/support-category/support-category.module').then(m => m.SupportCategoryModule) },
      { path: 'support-request', loadChildren: () => import('src/app/support-request/support-request.module').then(m => m.SupportRequestModule) },
      { path: 'bank-transfer', loadChildren: () => import('src/app/bank-transfer/bank-transfer.module').then(m => m.BankTransferModule) },
      { path: 'cash-pickup', loadChildren: () => import('src/app/cash-pickup/cash-pickup.module').then(m => m.CashPickupModule) },
      { path: 'merchant', loadChildren: () => import('src/app/merchant/merchant.module').then(m => m.MerchantModule) },
      { path: 'plans', loadChildren: () => import('src/app/plans/plans/plans.module').then(m => m.PlansModule) },
      { path: 'permission', loadChildren: () => import('src/app/permission/permission.module').then(m => m.PermissionModule) },
      { path: 'bank-transfer-merchant', loadChildren: () => import('src/app/bank-transfer-merchant/bank-transfer-merchant.module').then(m => m.BankTransferMerchantModule) },
      { path: 'cash-pickup-merchant', loadChildren: () => import('src/app/cash-pickup-merchant/cash-pickup-merchant.module').then(m => m.CashPickupMerchantModule) }
    ]
  },
  { path: '**', component: NotfoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

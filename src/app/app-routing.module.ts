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
      ]
  },
  { path: '**', component: NotfoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Routers childs
import { DashboardRoutingModule } from './dashboard/dashboard.routing';

// landing components
import {LandingComponent} from './landing/landing.component';
import { RecoverpasswordComponent } from './landing/recoverpassword/recoverpassword.component';
import { ChangepasswordComponent } from './landing/changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResponseresetpasswordComponent } from './landing/responseresetpassword/responseresetpassword.component';

// guards
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { ResetPasswordGuard } from './guards/resetPassword.guard';



const routes: Routes = [
  {path: 'landing', component: LandingComponent, canActivate: [LoginGuard]},
  {path: 'recoverpassword', component: RecoverpasswordComponent, canActivate: [LoginGuard]},
  {path: 'changepassword', component: ChangepasswordComponent, canActivate: [ResetPasswordGuard]},
  {path: 'responseResetPassword/:token/:uid', component: ResponseresetpasswordComponent },
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '**', component: LandingComponent, canActivate: [LoginGuard]}
  /* {path: 'landing', component: LandingComponent},
  {path: 'recoverpassword', component: RecoverpasswordComponent},
  {path: 'changepassword', component: ChangepasswordComponent},
  {path: 'responseResetPassword/:token/:uid', component: ResponseresetpasswordComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: '**', component: LandingComponent} */
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),DashboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

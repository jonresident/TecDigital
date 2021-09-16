import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Routers childs
import { DashboardRoutingModule } from './dashboard/dashboard.routing';

// landing components
import {LandingComponent} from './landing/landing.component';
import { RecoverpasswordComponent } from './landing/recoverpassword/recoverpassword.component';
import { ChangepasswordComponent } from './landing/changepassword/changepassword.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// guards
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path: 'landing', component: LandingComponent, canActivate: [LoginGuard]},
  {path: 'recoverpassword', component: RecoverpasswordComponent, canActivate: [LoginGuard]},
  {path: 'changepassword', component: ChangepasswordComponent, canActivate: [LoginGuard]},
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: '**', component: LandingComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LandingComponent, canActivate: [LoginGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),DashboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

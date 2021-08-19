import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Routers childs
import { DashboardRoutingModule } from './dashboard/dashboard.routing';

// landing components
import {LandingComponent} from './landing/landing.component';
import { RecoverpasswordComponent } from './landing/recoverpassword/recoverpassword.component';
import { ChangepasswordComponent } from './landing/changepassword/changepassword.component';


const routes: Routes = [
  {path: 'landing', component: LandingComponent},
  {path: 'recoverpassword', component: RecoverpasswordComponent},
  {path: 'changepassword', component: ChangepasswordComponent},
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }),DashboardRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

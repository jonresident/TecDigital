import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module libs Angular
import { NgwWowModule } from 'ngx-wow';

// Module router
import { RouterModule } from '@angular/router';

// Services
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// landing components
import { LandingComponent } from './landing.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { RecoverpasswordComponent } from './recoverpassword/recoverpassword.component';
import { ResponseresetpasswordComponent } from './responseresetpassword/responseresetpassword.component';



@NgModule({
  declarations: [
    LandingComponent,
    ChangepasswordComponent,
    RecoverpasswordComponent,
    ResponseresetpasswordComponent
  ],
  exports: [
    LandingComponent,
    ChangepasswordComponent,
    RecoverpasswordComponent,
    ResponseresetpasswordComponent
  ],
  imports: [
    CommonModule,
    NgwWowModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LandingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module libs Angular
import { NgwWowModule } from 'ngx-wow';

// Module router
import { RouterModule } from '@angular/router';

// Services
import { FormsModule } from '@angular/forms';

// landing components
import { LandingComponent } from './landing.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { RecoverpasswordComponent } from './recoverpassword/recoverpassword.component';



@NgModule({
  declarations: [
    LandingComponent,
    ChangepasswordComponent,
    RecoverpasswordComponent
  ],
  exports: [
    LandingComponent,
    ChangepasswordComponent,
    RecoverpasswordComponent
  ],
  imports: [
    CommonModule,
    NgwWowModule,
    RouterModule,
    FormsModule
  ]
})
export class LandingModule { }

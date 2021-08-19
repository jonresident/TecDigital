import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module router
import { RouterModule } from '@angular/router';

// Services
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SubmenuComponent } from './submenu/submenu.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavigationComponent,
    SidebarComponent,
    SubmenuComponent
  ],
  exports: [
    NavigationComponent,
    SidebarComponent,
    FooterComponent,
    SubmenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class ShareModule { }

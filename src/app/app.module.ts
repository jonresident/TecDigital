import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Routs Global
import { AppRoutingModule } from './app-routing.module';

// Services
import { FormsModule } from '@angular/forms';

// External Modules
import { LandingModule } from './landing/landing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ShareModule } from './share/share.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LandingModule,
    DashboardModule,
    ShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

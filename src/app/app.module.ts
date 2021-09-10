import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Routs Global
import { AppRoutingModule } from './app-routing.module';

// Services
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    ShareModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

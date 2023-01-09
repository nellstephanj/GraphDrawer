import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LineChartModule} from "@swimlane/ngx-charts";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LineChartModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

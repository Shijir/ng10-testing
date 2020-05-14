import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {  HostViewAccessor, AppComponent, RowComponent, CellComponent } from './app.component';

@NgModule({
  declarations: [
    HostViewAccessor, AppComponent, RowComponent, CellComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

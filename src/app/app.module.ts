import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {viewActionReducer} from "./store/viewReducers";
import {httpActionReducer} from "./store/httpReducers";
import {CmsModule} from "./views/cms/module/cms.module";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      viewActions: viewActionReducer,
      httpActions: httpActionReducer,
    }),
    HttpClientModule,
    CmsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

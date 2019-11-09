import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {menuReducer, textBlockReducer} from './store/reducers';
import {ComponentTracker} from "./logic/pageComponent/ComponentTracker";
import {CmsModule} from "./views/cms.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      menuSelection: menuReducer,
      textBlockActions: textBlockReducer,
    }),
    HttpClientModule,
    CmsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

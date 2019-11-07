import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenuComponent} from "./components/cms/menu.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from '@angular/material/button';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MenuButtonComponent} from "./components/cms/menu-button.component";
import {CmsComponent} from "./components/cms/cms.component";

import { StoreModule } from '@ngrx/store';
import { menuReducer } from './store/reducers';
import {WorkAreaComponent} from "./components/cms/work-area.component";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuButtonComponent,
    CmsComponent,
    WorkAreaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    AngularFontAwesomeModule,
    StoreModule.forRoot({menuSelection: menuReducer})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

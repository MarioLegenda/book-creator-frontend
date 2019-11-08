import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenuComponent} from "./components/cms/menu.component";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material";
import {ReactiveFormsModule} from "@angular/forms";

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {MenuButtonComponent} from "./components/cms/menu-button.component";
import {CmsComponent} from "./components/cms/cms.component";

import { StoreModule } from '@ngrx/store';
import {menuReducer, textBlockReducer} from './store/reducers';
import {WorkAreaComponent} from "./components/cms/work-area.component";
import {TextBlockComponent} from "./components/cms/blocks/text-block.component";
import {SelectionAreaComponent} from "./components/cms/selection-area.component";
import {BlockSelectorComponent} from "./components/cms/blocks/block-selector.component";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MenuButtonComponent,
    CmsComponent,
    WorkAreaComponent,
    TextBlockComponent,
    SelectionAreaComponent,
    BlockSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    AngularFontAwesomeModule,
    StoreModule.forRoot({
      menuSelection: menuReducer,
      textBlockActions: textBlockReducer,
    }),
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

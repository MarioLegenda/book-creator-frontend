import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {viewActionReducer as pageViewReducer} from "../store/page/viewReducers";
import {httpActionReducer as pageHttpReducer} from "../store/page/httpReducers";
import {editorActionReducer as editorViewReducer} from "../store/editor/editorViewReducers";
import {httpActionReducer as knowledgeSourceHttpActionReducer} from "../store/knowledgeSource/httpReducers";
import {viewActionReducer as knowledgeSourceViewActionReducer} from "../store/knowledgeSource/viewReducers";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      pageViewActions: pageViewReducer,
      pageHttpActions: pageHttpReducer,
      knowledgeSourceHttpActions: knowledgeSourceHttpActionReducer,
      knowledgeSourceViewActions: knowledgeSourceViewActionReducer,
      editorViewReducer: editorViewReducer,
    }),
    HttpClientModule,
    MonacoEditorModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

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
import {editorViewReducer} from "../store/editor/viewReducers";
import {editorHttpReducer} from "../store/editor/httpReducers";
import {httpActionReducer as knowledgeSourceHttpActionReducer} from "../store/knowledgeSource/httpReducers";
import {viewActionReducer as knowledgeSourceViewActionReducer} from "../store/knowledgeSource/viewReducers";
import {TabSession} from "../store/sessions/TabSession";
import {clearState} from "../store/globalReducers";

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
      editorViewActions: editorViewReducer,
      editorHttpActions: editorHttpReducer,
    }, {
      metaReducers: [clearState]
    }),
    HttpClientModule,
    MonacoEditorModule.forRoot(),
  ],
  providers: [{provide: TabSession, useClass: TabSession}],
  bootstrap: [AppComponent]
})
export class AppModule { }

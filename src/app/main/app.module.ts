import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {TokenInterceptor} from "../interceptors/Token.interceptor";
import {GlobalErrorHandler} from "../error/GlobalErrorHandler";
import {HttpErrorInterceptor} from "../interceptors/HttpError.interceptor";
import {globalErrorReducer} from "../store/global/reducers";
import {GlobalErrorComponentModal} from "../views/shared/modals/global-error.component";
import {MatDialogModule} from "@angular/material/dialog";
import {NotFoundComponent} from "../views/notFound/not-found.component";
import {ProfileBarModule} from "../views/shared/profileBar/profile-bar.module";
import {CookieService} from 'ngx-cookie-service';
import {DeviceDetectorModule} from "ngx-device-detector";

@NgModule({
  declarations: [
    AppComponent,
    GlobalErrorComponentModal,
    NotFoundComponent,
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
      globalErrorActions: globalErrorReducer,
    }, {
      metaReducers: [clearState],
    }),
    HttpClientModule,
    MonacoEditorModule.forRoot(),
    MatDialogModule,
    ProfileBarModule,
    DeviceDetectorModule.forRoot(),
  ],
  providers: [
    {provide: TabSession, useClass: TabSession},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {provide: ErrorHandler, useClass: GlobalErrorHandler},
    CookieService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    GlobalErrorComponentModal,
  ]
})
export class AppModule { }

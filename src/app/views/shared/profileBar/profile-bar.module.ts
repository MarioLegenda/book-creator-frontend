import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './appComponent/app.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NewCodeProjectModule} from "../modules/newCodeProjectModal/new-code-project.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        BrowserModule,
        MatDialogModule,
        NewCodeProjectModule,
        RouterModule,
    ],
  exports: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
})
export class ProfileBarModule { }

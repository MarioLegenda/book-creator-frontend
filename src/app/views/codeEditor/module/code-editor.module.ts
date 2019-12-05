import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {CodeEditorRoutingModule} from "./code-editor-routing.module";

@NgModule({
  declarations: [
    BootstrapComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CodeEditorRoutingModule,
  ],
  providers: [],
})
export class CodeEditorModule { }

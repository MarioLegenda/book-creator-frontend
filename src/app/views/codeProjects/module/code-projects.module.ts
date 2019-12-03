import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {CodeProjectsRoutingModule} from "./code-projects-routing.module";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    BootstrapComponent
  ],
  imports: [
    MatTabsModule,

    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CodeProjectsRoutingModule,
  ],
  providers: [],
})
export class CodeProjectsModule { }

import {NgModule} from "@angular/core";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {CommonModule} from "@angular/common";
import {CodeProjectsManagerRoutingModule} from "./code-projects-manager-routing.module";
import {InfoComponent} from "../info/info.component";
import {PackagesComponent} from "../packages/packages.component";
import {MenuComponent} from "../menu/menu.component";

@NgModule({
  declarations: [
    BootstrapComponent,
    MenuComponent,
    InfoComponent,
    PackagesComponent,
  ],
  imports: [
    CommonModule,
    CodeProjectsManagerRoutingModule,
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class CodeProjectsManagerModule { }

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverviewRoutingModule} from "./overview-routing.module";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {MenuComponent} from "../menu/menu.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {CodeProjectsComponent} from "../codeProjects/code-projects.component";
import {ItemComponent} from "../codeProjects/item/item.component";

@NgModule({
  declarations: [
    BootstrapComponent,
    MenuComponent,
    CodeProjectsComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OverviewRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
})
export class OverviewModule { }

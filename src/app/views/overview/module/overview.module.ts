import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverviewRoutingModule} from "./overview-routing.module";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {MenuComponent} from "../menu/menu.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    BootstrapComponent,
    MenuComponent,
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

import {NgModule} from "@angular/core";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {MenuComponent} from "../menu/menu.component";
import {ProfileComponent} from "../profile/profile.component";
import {SettingsComponent} from "../settings/settings.component";
import {CommonModule} from "@angular/common";
import {UserSectionRoutingModule} from "./user-section-routing.module";

@NgModule({
  declarations: [
    BootstrapComponent,
    MenuComponent,
    ProfileComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    UserSectionRoutingModule,
  ],
  providers: [
  ],
  entryComponents: [
  ]
})
export class UserSectionModule { }

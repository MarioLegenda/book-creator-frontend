import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {ProfileComponent} from "../profile/profile.component";
import {SettingsComponent} from "../settings/settings.component";

const routes: Routes = [
  {
    path: '',
    component: BootstrapComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserSectionRoutingModule { }

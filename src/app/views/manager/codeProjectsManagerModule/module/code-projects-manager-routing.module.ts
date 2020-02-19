import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {InfoComponent} from "../info/info.component";
import {PackagesComponent} from "../packages/packages.component";
import {SettingsComponent} from "../settings/settings.component";

const routes: Routes = [
  {
    path: '',
    component: BootstrapComponent,
    children: [
      {
        path: 'info',
        component: InfoComponent,
      },
      {
        path: 'packages',
        component: PackagesComponent,
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
export class CodeProjectsManagerRoutingModule { }

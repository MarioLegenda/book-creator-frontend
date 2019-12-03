import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BootstrapComponent} from "../bootstrap/bootstrap.component";

const routes: Routes = [
  {
    path: ':type/:sourceShortId',
    component: BootstrapComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodeProjectsRoutingModule { }

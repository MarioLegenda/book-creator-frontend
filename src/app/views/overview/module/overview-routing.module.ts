import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {CodeProjectsComponent} from "../codeProjects/code-projects.component";

const routes: Routes = [
  {
    path: '',
    component: BootstrapComponent,
    children: [
      {
        path: 'code-projects/:type/:sourceShortId',
        component: CodeProjectsComponent,
      },
      {
        path: 'code-projects',
        component: CodeProjectsComponent,
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OverviewRoutingModule { }

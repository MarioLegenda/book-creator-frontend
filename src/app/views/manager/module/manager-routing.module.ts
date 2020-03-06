import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { KnowledgeSourceListingComponent } from '../blogs/listing/knowledge-source-listing.component';
import { CodeProjectsComponent } from '../codeProjects/listing/code-projects.component';
import { OverviewComponent } from '../overview/overview.component';
import {SettingsComponent} from "../settings/settings.component";
import {ProfileComponent} from "../profile/profile.component";

const routes: Routes = [
  {
    path: '',
    component: BootstrapComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
      },
      {
        path: 'blogs/list',
        component: KnowledgeSourceListingComponent,
      },
      {
        path: 'code-projects/list',
        component: CodeProjectsComponent,
      },
      {
        path: 'code-projects/:type/:sourceShortId',
        component: CodeProjectsComponent,
      },
      {
        path: 'user-section/profile',
        component: ProfileComponent,
      },
      {
        path: 'user-section/settings',
        component: SettingsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }

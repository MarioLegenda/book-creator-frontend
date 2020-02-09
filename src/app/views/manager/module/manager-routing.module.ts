import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { KnowledgeSourceListingComponent } from '../blogs/listing/knowledge-source-listing.component';
import { CodeProjectsComponent } from '../codeProjects/listing/code-projects.component';
import { OverviewComponent } from '../overview/overview.component';

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
    ],
  },
  {
    path: 'user-section',
    loadChildren: () => import('./../userSectionModule/module/user-section.module').then(m => m.UserSectionModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }

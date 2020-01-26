import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { ProjectManagerComponent } from '../projectManager/project-manager.component';
import { KnowledgeSourceListingComponent } from '../knowledgeSources/listing/knowledge-source-listing.component';
import { CodeProjectsComponent } from '../codeProjects/code-projects.component';
import { OverviewComponent } from '../overview/overview.component';

const routes: Routes = [
  {
    path: '',
    component: BootstrapComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'code-projects/:shortId',
        component: ProjectManagerComponent,
      },
      {
        path: 'knowledge-sources/list',
        component: KnowledgeSourceListingComponent,
      },
      {
        path: 'code-projects/:type/:sourceShortId',
        component: CodeProjectsComponent,
      },
      {
        path: 'code-projects',
        component: CodeProjectsComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }

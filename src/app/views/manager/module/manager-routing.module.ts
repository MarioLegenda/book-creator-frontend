import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { ProjectManagerComponent } from '../projectManager/project-manager.component';
import { KnowledgeSourceComponent } from '../knowledgeSources/knowledge-source.component';
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
        path: 'knowledge-sources',
        component: KnowledgeSourceComponent,
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

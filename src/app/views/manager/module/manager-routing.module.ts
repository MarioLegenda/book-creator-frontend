import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { KnowledgeSourceListingComponent } from '../blogs/listing/knowledge-source-listing.component';
import { CodeProjectsComponent } from '../codeProjects/listing/code-projects.component';
import {ProfileComponent} from "../profile/profile.component";
import {PublishComponent} from "../publishBlog/publish.component";
import {SubscriptionComponent} from "../subscriptions/subscription.component";

const routes: Routes = [
  {
    path: '',
    component: BootstrapComponent,
    children: [
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
        path: 'user-section/subscriptions',
        component: SubscriptionComponent,
      },
      {
        path: 'blog/publish/:sourceShortId',
        component: PublishComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule { }

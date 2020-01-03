import {NgModule} from "@angular/core";
import { ManagerRoutingModule } from './manager-routing.module';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { ProjectManagerComponent } from '../projectManager/project-manager.component';
import { CodeProjectsComponent } from '../codeProjects/code-projects.component';
import { ItemComponent } from '../codeProjects/item/item.component';
import { AddKnowledgeSourceDialogComponent } from '../modals/addKnowledgeSource/add-knowledge-source.component';
import { KnowledgeSourceComponent } from '../knowledgeSources/knowledge-source.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OverviewComponent } from '../overview/overview.component';
import { OverviewMenuComponent } from '../menu/menu.component';

@NgModule({
  declarations: [
    BootstrapComponent,
    ProjectManagerComponent,
    OverviewMenuComponent,
    CodeProjectsComponent,
    ItemComponent,
    AddKnowledgeSourceDialogComponent,
    KnowledgeSourceComponent,
    OverviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ManagerRoutingModule,
  ],
  providers: [],
  entryComponents: [
    AddKnowledgeSourceDialogComponent
  ]
})
export class ManagerModule { }

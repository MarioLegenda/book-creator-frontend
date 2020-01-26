import {NgModule} from "@angular/core";
import { ManagerRoutingModule } from './manager-routing.module';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { ProjectManagerComponent } from '../projectManager/project-manager.component';
import { CodeProjectsComponent } from '../codeProjects/code-projects.component';
import { ItemComponent } from '../codeProjects/item/item.component';
import { ItemComponent as KSItem } from '../knowledgeSources/item/item.component';
import { AddKnowledgeSourceDialogComponent } from '../modals/addKnowledgeSource/add-knowledge-source.component';
import { KnowledgeSourceListingComponent } from '../knowledgeSources/listing/knowledge-source-listing.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OverviewComponent } from '../overview/overview.component';
import { OverviewMenuComponent } from '../menu/menu.component';
import {RemoveConfirmDialogComponent} from "../modals/removeConfirm/remove-confirm-modal.component";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {SearchComponent} from "../../shared/search/search.component";

@NgModule({
  declarations: [
    BootstrapComponent,
    ProjectManagerComponent,
    OverviewMenuComponent,
    CodeProjectsComponent,
    ItemComponent,
    AddKnowledgeSourceDialogComponent,
    KnowledgeSourceListingComponent,
    OverviewComponent,
    KSItem,
    RemoveConfirmDialogComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    ManagerRoutingModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [],
  entryComponents: [
    AddKnowledgeSourceDialogComponent,
    RemoveConfirmDialogComponent,
  ]
})
export class ManagerModule { }

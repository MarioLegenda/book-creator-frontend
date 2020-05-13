import {NgModule} from "@angular/core";
import { ManagerRoutingModule } from './manager-routing.module';
import { BootstrapComponent } from '../bootstrap/bootstrap.component';
import { CodeProjectsComponent } from '../codeProjects/listing/code-projects.component';
import { ItemComponent as CPItem } from '../codeProjects/item/item.component';
import { ItemComponent as KSItem } from '../blogs/item/item.component';
import { AddKnowledgeSourceDialogComponent } from '../modals/addKnowledgeSource/add-knowledge-source.component';
import { KnowledgeSourceListingComponent } from '../blogs/listing/knowledge-source-listing.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { OverviewMenuComponent } from '../menu/menu.component';
import {RemoveConfirmDialogComponent} from "../modals/removeConfirm/remove-confirm-modal.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {SearchComponent} from "../../shared/search/search.component";
import {MatSelectModule} from "@angular/material/select";
import {NewCodeProjectModule} from "../../shared/modules/newCodeProjectModal/new-code-project.module";
import {RemoveItemService} from "../shared/RemoveItemService";
import {ProfileComponent} from "../profile/profile.component";
import {SettingsComponent} from "../settings/settings.component";
import {PublishComponent} from "../publishBlog/publish.component";
import {SubscriptionItem} from "../settings/subscriptionItem/subscription-item.component";
import {UnsubscribeDialog} from "../modals/unsubscribeDialog/unsubscribe-dialog.component";
import {PublishBlogModalComponent} from "../modals/publishedBlog/publish-blog-modal.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NotifyIfPublishedModal} from "../modals/notifyIfPublished/notify-if-published-modal.component";
import {RemoveCodeProjectModalComponent} from "../modals/removeCodeProject/remove-code-project-modal.component";
import {ListingFilterComponent} from "../shared/listingFilter/listing-filter.component";

@NgModule({
  declarations: [
    BootstrapComponent,
    OverviewMenuComponent,
    CodeProjectsComponent,
    CPItem,
    AddKnowledgeSourceDialogComponent,
    KnowledgeSourceListingComponent,
    KSItem,
    RemoveConfirmDialogComponent,
    UnsubscribeDialog,
    SearchComponent,
    ProfileComponent,
    SettingsComponent,
    PublishComponent,
    SubscriptionItem,
    PublishBlogModalComponent,
    NotifyIfPublishedModal,
    RemoveCodeProjectModalComponent,
    ListingFilterComponent
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
    MatSelectModule,
    NewCodeProjectModule,
    MatTooltipModule,
  ],
  providers: [
    {useClass: RemoveItemService, provide: RemoveItemService},
  ],
  entryComponents: [
    AddKnowledgeSourceDialogComponent,
    RemoveConfirmDialogComponent,
    UnsubscribeDialog,
    PublishBlogModalComponent,
    NotifyIfPublishedModal,
    RemoveCodeProjectModalComponent,
  ]
})
export class ManagerModule { }

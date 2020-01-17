import {NgModule} from "@angular/core";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {NgxGistModule} from 'ngx-gist/dist/ngx-gist.module';

import {MenuComponent} from "../menu/menu.component";
import {MenuButtonComponent} from "../menu/menu-button.component";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {WorkAreaComponent} from "../workArea/work-area.component";
import {TextBlockComponent} from "../blocks/textBlock/text-block.component";
import {PageRoutingModule} from "./page-routing.module";

import {CommonModule} from "@angular/common";
import {MetadataPlaceholderComponent} from "../blocks/textBlock/metadataPlaceholder/metadata-placeholder.component";
import {CodeBlockComponent} from "../blocks/codeBlock/code-block.component";
import {MonacoEditorModule} from "ngx-monaco-editor";
import {AddGithubGistDialogComponent} from "../modals/addGithubGist/add-github-gist-modal.component";
import {InfoComponent} from "../blocks/info/info.component";
import {TestRunResultComponent} from "../blocks/testRun/test-run-result.component";
import {RemoveConfirmDialogComponent} from "../modals/removeConfirm/remove-confirm-modal.component";
import {SelectEnvironmentDialog} from "../modals/selectEnvironment/select-environment.component";
import {BlockErrorComponent} from "../blocks/blockError/block-error.component";
import {BlogTitleComponent} from "../blog/title/blog-title.component";
import {BlogIntroComponent} from "../blog/intro/blog-intro.component";
import {TextCounterComponent} from "../../shared/textCounter/text-counter.component";
import {ImportCodeProjectDialogComponent} from "../modals/importCodeProject/import-code-project.component";
import {NewCodeProjectDialogComponent} from "../modals/newCodeProject/new-code-project.component";
import {MatSelectModule} from "@angular/material/select";
import {OpenDirectoryStructureDialogComponent} from "../modals/openDirectoryStructure/open-directory-structure.component";
import {FileExplorerModule} from "../../shared/modules/fileExplorer/file-explorer.module";

@NgModule({
  declarations: [
    BootstrapComponent,
    MenuComponent,
    MenuButtonComponent,
    WorkAreaComponent,
    TextBlockComponent,
    MetadataPlaceholderComponent,
    CodeBlockComponent,
    AddGithubGistDialogComponent,
    InfoComponent,
    TestRunResultComponent,
    RemoveConfirmDialogComponent,
    SelectEnvironmentDialog,
    BlockErrorComponent,
    BlogTitleComponent,
    BlogIntroComponent,
    TextCounterComponent,
    ImportCodeProjectDialogComponent,
    NewCodeProjectDialogComponent,
    OpenDirectoryStructureDialogComponent,
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    CKEditorModule,
    DragDropModule,
    MonacoEditorModule,
    MatTooltipModule,
    MatCheckboxModule,
    NgxGistModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,

    FileExplorerModule,

    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    PageRoutingModule,
  ],
  providers: [],
  entryComponents: [
    AddGithubGistDialogComponent,
    RemoveConfirmDialogComponent,
    SelectEnvironmentDialog,
    ImportCodeProjectDialogComponent,
    NewCodeProjectDialogComponent,
    OpenDirectoryStructureDialogComponent,
  ]
})
export class PageModule { }

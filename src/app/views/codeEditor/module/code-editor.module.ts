import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {CodeEditorRoutingModule} from "./code-editor-routing.module";
import {MonacoEditorModule} from "ngx-monaco-editor";
import {WorkspaceComponent} from "../workspace/workspace.component";
import {FileExplorerComponent} from "../fileExplorer/file-explorer.component";
import {StructureComponent} from "../fileExplorer/structure/structure.component";
import {DirectoryComponent} from "../fileExplorer/structure/directory/directory.component";
import {FileComponent} from "../fileExplorer/structure/file/file.component";
import {MatDialogModule} from "@angular/material/dialog";
import {AddFileDialogComponent} from "../fileExplorer/structure/modals/file/add-file-dialog.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {AddDirectoryDialogComponent} from "../fileExplorer/structure/modals/directory/add-directory-dialog.component";
import {FileTabsComponent} from "../workspace/fileTabs/file-tabs.component";
import {TextEditorComponent} from "../workspace/textEditor/text-editor.component";
import {TabComponent} from "../workspace/fileTabs/tab/tab.component";
import {TabSession} from "../../../store/sessions/TabSession";
import {DeleteDirectoryDialogComponent} from "../fileExplorer/structure/modals/deleteDirectory/delete-directory-dialog.component";
import {DeleteFileDialogComponent} from "../fileExplorer/structure/modals/deleteFile/delete-file-dialog.component";

@NgModule({
  declarations: [
    BootstrapComponent,
    WorkspaceComponent,
    FileExplorerComponent,
    StructureComponent,
    DirectoryComponent,
    FileComponent,
    AddFileDialogComponent,
    AddDirectoryDialogComponent,
    FileTabsComponent,
    TextEditorComponent,
    TabComponent,
    DeleteDirectoryDialogComponent,
    DeleteFileDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CodeEditorRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,

    MonacoEditorModule,
  ],
  providers: [],
  entryComponents: [
    AddFileDialogComponent,
    AddDirectoryDialogComponent,
    DeleteDirectoryDialogComponent,
    DeleteFileDialogComponent,
  ]
})
export class CodeEditorModule { }

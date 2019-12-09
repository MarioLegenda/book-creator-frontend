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
import {AddFileDialogComponent} from "../fileExplorer/structure/modals/add-file-dialog.component";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    BootstrapComponent,
    WorkspaceComponent,
    FileExplorerComponent,
    StructureComponent,
    DirectoryComponent,
    FileComponent,
    AddFileDialogComponent,
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
  ]
})
export class CodeEditorModule { }

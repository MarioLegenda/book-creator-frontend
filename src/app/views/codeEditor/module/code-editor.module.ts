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

@NgModule({
  declarations: [
    BootstrapComponent,
    WorkspaceComponent,
    FileExplorerComponent,
    StructureComponent,
    DirectoryComponent,
    FileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CodeEditorRoutingModule,

    MonacoEditorModule,
  ],
  providers: [],
})
export class CodeEditorModule { }

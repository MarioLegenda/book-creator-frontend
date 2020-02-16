import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BootstrapComponent} from "../bootstrap/bootstrap.component";
import {CodeEditorRoutingModule} from "./code-editor-routing.module";
import {MonacoEditorModule} from "ngx-monaco-editor";
import {WorkspaceComponent} from "../workspace/workspace.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FileTabsComponent} from "../workspace/fileTabs/file-tabs.component";
import {TextEditorComponent} from "../workspace/textEditor/text-editor.component";
import {TabComponent} from "../workspace/fileTabs/tab/tab.component";
import {PlaygroundComponent} from "../workspace/playground/playground.component";
import {WorkingAreaComponent} from "../workspace/playground/workingArea/working-area.component";
import {ResultAreaComponent} from "../workspace/playground/resultArea/result-area.component";
import {FileExplorerModule} from "../../shared/modules/fileExplorer/file-explorer.module";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    BootstrapComponent,
    WorkspaceComponent,
    FileTabsComponent,
    TextEditorComponent,
    TabComponent,
    PlaygroundComponent,
    WorkingAreaComponent,
    ResultAreaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CodeEditorRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FileExplorerModule,

    MonacoEditorModule,
  ],
  providers: [],
})
export class CodeEditorModule { }

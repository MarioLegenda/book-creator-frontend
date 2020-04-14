import {NgModule} from "@angular/core";
import {FileExplorerComponent} from "./components/explorer/file-explorer.component";
import {DirectoryComponent} from "./components/structure/directory/directory.component";
import {FileComponent} from "./components/structure/file/file.component";
import {StructureComponent} from "./components/structure/structure.component";
import {AddDirectoryDialogComponent} from "./components/structure/modals/addDirectory/add-directory-dialog.component";
import {AddFileDialogComponent} from "./components/structure/modals/addFile/add-file-dialog.component";
import {DeleteDirectoryDialogComponent} from "./components/structure/modals/deleteDirectory/delete-directory-dialog.component";
import {DeleteFileDialogComponent} from "./components/structure/modals/deleteFile/delete-file-dialog.component";
import {EditDirectoryDialogComponent} from "./components/structure/modals/editDirectory/edit-directory-dialog.component";
import {EditFileDialogComponent} from "./components/structure/modals/editFile/edit-file-dialog.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ActionSetComponent} from "./components/structure/actionSet/action-set.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {DragDropBuffer} from "./services/DragDropBuffer";
import {CopyBuffer} from "./services/CopyBuffer";

@NgModule({
  declarations: [
    FileExplorerComponent,
    StructureComponent,
    DirectoryComponent,
    FileComponent,

    AddDirectoryDialogComponent,
    AddFileDialogComponent,
    DeleteDirectoryDialogComponent,
    DeleteFileDialogComponent,
    EditDirectoryDialogComponent,
    EditFileDialogComponent,
    ActionSetComponent,
  ],
  exports: [
    FileExplorerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
  ],
  entryComponents: [
    AddDirectoryDialogComponent,
    AddFileDialogComponent,
    DeleteDirectoryDialogComponent,
    DeleteFileDialogComponent,
    EditDirectoryDialogComponent,
    EditFileDialogComponent,
  ],
  providers: [
    {provide: DragDropBuffer, useClass: DragDropBuffer},
    {provide: CopyBuffer, useClass: CopyBuffer},
  ]
})
export class FileExplorerModule { }

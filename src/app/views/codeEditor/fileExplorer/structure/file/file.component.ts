import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileAppModel} from "../../../../../model/app/codeEditor/FileAppModel";
import {FileRepository} from "../../../../../repository/FileRepository";
import {Store} from "@ngrx/store";
import {httpGetFileContentAction, httpRemoveFile} from "../../../../../store/editor/httpActions";
import {MatDialog} from "@angular/material/dialog";
import {DeleteFileDialogComponent} from "../modals/deleteFile/delete-file-dialog.component";
import {EditFileDialogComponent} from "../modals/editFile/edit-file-dialog.component";

@Component({
  selector: 'cms-file',
  styleUrls: [
    '../global-actions.component.scss',
    './file.component.scss',
  ],
  templateUrl: './file.component.html',
})
export class FileComponent implements OnInit {
  @Input('file') file: FileAppModel;
  @Output('fileRemovedEvent') fileRemovedEvent = new EventEmitter();

  constructor(
    private fileRepository: FileRepository,
    private store: Store<any>,
    private dialog: MatDialog,
  ) {}

  componentState = {
    showed: false,
    hovered: false,
    fileStyles: {},
    icons: {
      removeFile: 'far fa-trash-alt remove',
      file: 'far fa-file-code',
      editFile: 'far fa-edit'
    }
  };

  ngOnInit() {
    if (this.file.isJavascript()) {
      this.componentState.icons.file = "fab fa-js-square";
    }

    let wBase = 15;
    let p = 0;
    if (this.file.depth === 1) {
      p = 33;
    } else if (this.file.depth === 2) {
      p = (this.file.depth * 24);
    } else if (this.file.depth > 2) {
      p = (this.file.depth * 24) - 10;
    }

    const w = 269 + (this.file.depth * wBase);
    this.componentState.fileStyles['width'] = `${w}px`;
    this.componentState.fileStyles['padding-left'] = `${p}px`;
  }

  removeFileDialog() {
    const dialogRef = this.dialog.open(DeleteFileDialogComponent, {
      width: '400px',
      data: {name: this.file.name},
    });

    dialogRef.afterClosed().subscribe((decision) => {
      if (decision !== true) return;

      this.store.dispatch(httpRemoveFile(this.file));

      this.fileRemovedEvent.emit(this.file);
    });
  }

  editFileDialog() {
    const dialogRef = this.dialog.open(EditFileDialogComponent, {
      width: '400px',
      data: new FileAppModel(
        this.file.name,
        this.file.id,
        this.file.directoryId,
        this.file.content,
        'file',
        this.file.depth,
        this.file.codeProjectUuid,
      ),
    });

    dialogRef.afterClosed().subscribe(() => {

    });
  }

  showFile() {
    this.store.dispatch(httpGetFileContentAction(this.file));
  }

  fileHovered() {
    this.componentState.hovered = true;
  }

  fileUnHovered() {
    this.componentState.hovered = false;
  }
}

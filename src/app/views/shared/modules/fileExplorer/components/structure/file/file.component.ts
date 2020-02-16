import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FileRepository} from "../../../../../../../repository/FileRepository";
import {Store} from "@ngrx/store";
import {httpGetFileContentAction, httpRemoveFile} from "../../../../../../../store/editor/httpActions";
import {MatDialog} from "@angular/material/dialog";
import {DeleteFileDialogComponent} from "../modals/deleteFile/delete-file-dialog.component";
import {EditFileDialogComponent} from "../modals/editFile/edit-file-dialog.component";
import {StaticFileWrapper} from "../../../../../../../library/StaticFileWrapper";

@Component({
  selector: 'cms-file',
  styleUrls: [
    '../global-actions.component.scss',
    './file.component.scss',
  ],
  templateUrl: './file.component.html',
})
export class FileComponent implements OnInit {
  @Input('file') file;

  @Input('extension') extension: string;

  @Output('fileRemovedEvent') fileRemovedEvent = new EventEmitter();

  // @ts-ignore
  @ViewChild('iconRef') iconRef: ElementRef;

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
    if (StaticFileWrapper.isJavascript(this.file)) {
      this.componentState.icons.file = "fab fa-js-square";
    }

    let depth = this.file.depth;

    if (depth > 1) {
      depth = depth + 1;
    }

    let wBase = (depth === 1) ? 17 : 15;
    const w = 269 + (depth * wBase);
    const pl = depth * wBase;

    this.componentState.fileStyles['width'] = `${w}px`;
    this.componentState.fileStyles['padding-left'] = `${pl}px`;
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
    const data = {
      name: this.file.name,
      id: this.file.id,
      directoryId: this.file.directoryId,
      content: this.file.content,
      type: 'file',
      depth: this.file.depth,
      codeProjectUuid: this.file.codeProjectUuid,
    };

    const dialogRef = this.dialog.open(EditFileDialogComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((newFile) => {
      if (!newFile) return;

      this.file.name = newFile.name;
    });
  }

  showFile() {
    this.store.dispatch(httpGetFileContentAction(this.file));
  }

  fileHovered() {
    this.componentState.hovered = true;

    this.iconRef.nativeElement.setAttribute('style', 'color: #f0b500');
  }

  fileUnHovered() {
    this.componentState.hovered = false;

    this.iconRef.nativeElement.setAttribute('style', 'color: #b5b5b5');
  }
}

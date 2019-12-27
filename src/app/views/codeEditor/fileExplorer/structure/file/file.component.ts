import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileAppModel} from "../../../../../model/app/codeEditor/FileAppModel";
import {FileRepository} from "../../../../../repository/FileRepository";
import {Store} from "@ngrx/store";
import {httpGetFileContentAction, httpRemoveFile} from "../../../../../store/editor/httpActions";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDirectoryDialogComponent} from "../modals/deleteDirectory/delete-directory-dialog.component";

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
  @Input('depth') depth: number;
  @Output('fileRemoved') fileRemoved = new EventEmitter();

  constructor(
    private fileRepository: FileRepository,
    private store: Store<any>,
    private dialog: MatDialog,
  ) {}

  componentState = {
    showed: false,
    hovered: false,
    fileStyles: {
      'padding-left': '20px',
    },
    icons: {
      removeFile: 'far fa-trash-alt remove',
    }
  };

  ngOnInit() {
    if (this.depth === 1) {
      this.componentState.fileStyles['margin-left'] = `${this.depth * 35}px`;
    } else if (this.depth > 1) {
      this.componentState.fileStyles['margin-left'] = `${this.depth * 25}px`;
    }
  }

  removeFile() {
    const dialogRef = this.dialog.open(DeleteDirectoryDialogComponent, {
      width: '400px',
      data: {name: this.file.name},
    });

    dialogRef.afterClosed().subscribe((decision) => {
      if (decision !== true) return;

      this.store.dispatch(httpRemoveFile(this.file));

      this.fileRemoved.emit(this.file);
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

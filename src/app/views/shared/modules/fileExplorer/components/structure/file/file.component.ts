import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {FileRepository} from "../../../../../../../repository/FileRepository";
import {Store} from "@ngrx/store";
import {httpGetFileContentAction, httpRemoveFile} from "../../../../../../../store/editor/httpActions";
import {MatDialog} from "@angular/material/dialog";
import {DeleteFileDialogComponent} from "../modals/deleteFile/delete-file-dialog.component";
import {EditFileDialogComponent} from "../modals/editFile/edit-file-dialog.component";
import {StaticFileWrapper} from "../../../../../../../library/StaticFileWrapper";
import {DragDropBuffer} from "../../../services/DragDropBuffer";

@Component({
  selector: 'cms-file',
  styleUrls: [
    '../global-actions.component.scss',
    './file.component.scss',
  ],
  templateUrl: './file.component.html',
})
export class FileComponent implements OnInit, OnChanges {
  @Input('file') file;

  @Input('extension') extension: string;
  @Input('selectedItem') selectedItem: any;

  @Output('fileRemovedEvent') fileRemovedEvent = new EventEmitter();
  @Output('fileAttachedEvent') fileAttachedEvent = new EventEmitter();

  // @ts-ignore
  @ViewChild('iconRef', {static: true}) iconRef: ElementRef;

  constructor(
    private fileRepository: FileRepository,
    private store: Store<any>,
    private dialog: MatDialog,
    private dragDropBuffer: DragDropBuffer,
  ) {}

  hovered: boolean = false;
  attachActionSet: boolean = false;
  selected: boolean = false;
  fileStyles = {};

  iconSpecificFile: string = '';

  ngOnInit() {
    if (StaticFileWrapper.isJavascript(this.file)) {
      this.iconSpecificFile = "fab fa-js-square";
    } else if (StaticFileWrapper.isHtml(this.file)) {
      this.iconSpecificFile = "fab fa-html5";
    } else if (StaticFileWrapper.isJson(this.file)) {
      this.iconSpecificFile = "fab fa-js-square";
    }

    let depth = this.file.depth;

    if (this.file.searched) {
      depth = 1;
    }

    if (depth > 1) {
      depth = depth + 1;
    }

    let wBase = (depth === 1) ? 31 : 15;
    const w = 269 + (depth * wBase);
    const pl = depth * wBase;

    this.fileStyles['width'] = `${w}px`;
    this.fileStyles['padding-left'] = `${pl}px`;
  }

  onDrag() {
    this.dragDropBuffer.add(this.file);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItem && !changes.selectedItem.firstChange) {
      const data = changes.selectedItem.currentValue;

      if (data.type === 'directory') {
        this.attachActionSet = false;
        this.selected = false;
      } else if (data.id !== this.file.id) {
        this.attachActionSet = false;
        this.selected = false;
      }
    }
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
      extension: this.extension,
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

  onAttachActionSet() {
    this.attachActionSet = true;
    this.selected = true;
    this.fileAttachedEvent.emit({
      type: 'file',
      id: this.file.id,
    });
  }

  fileHovered() {
    this.hovered = true;

    if (StaticFileWrapper.isJavascript(this.file) ||
        StaticFileWrapper.isHtml(this.file) ||
        StaticFileWrapper.isJson(this.file)) {
      this.iconRef.nativeElement.setAttribute('style', 'color: #f0b500');
    }
  }

  fileUnHovered() {
    this.hovered = false;

    this.iconRef.nativeElement.setAttribute('style', 'color: #b5b5b5');
  }
}

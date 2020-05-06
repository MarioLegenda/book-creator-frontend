import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FileRepository} from "../../../../../../../repository/FileRepository";
import {Store} from "@ngrx/store";
import {httpGetFileContentAction} from "../../../../../../../store/editor/httpActions";
import {MatDialog} from "@angular/material/dialog";
import {DeleteFileDialogComponent} from "../modals/deleteFile/delete-file-dialog.component";
import {EditFileDialogComponent} from "../modals/editFile/edit-file-dialog.component";
import {StaticFileWrapper} from "../../../../../../../library/StaticFileWrapper";
import {DragDropBuffer} from "../../../services/DragDropBuffer";
import {CopyBuffer} from "../../../services/CopyBuffer";
import {Subject} from "rxjs";
import {IFile} from "../../../models/IFile";
import {IParentEvent} from "../../../models/IParentEvent";
import {ICodeProject} from "../../../../../../codeEditor/models/ICodeProject";
import deepcopy from 'deepcopy';

@Component({
  selector: 'cms-file',
  styleUrls: [
    '../global-actions.component.scss',
    './file.component.scss',
  ],
  templateUrl: './file.component.html',
})
export class FileComponent implements OnInit, OnDestroy {
  @Input('file') file: IFile;
  @Input('extension') extension: string;
  @Input('copyBufferSubject') copyBufferSubject: Subject<any>;
  @Input('basePadding') basePadding: number;
  @Input('parentEvent') parentEvent: Subject<IParentEvent>;
  @Input('project') project: ICodeProject;
  @Input('breadcrumbs') breadcrumbs: string[];

  @Output('fileRemovedEvent') fileRemovedEvent = new EventEmitter();

  @ViewChild('iconRef', {static: true}) iconRef: ElementRef;

  constructor(
    private fileRepository: FileRepository,
    private store: Store<any>,
    private dialog: MatDialog,
    private dragDropBuffer: DragDropBuffer,
    private copyBuffer: CopyBuffer,
  ) {}

  toggleActionSet: boolean = false;
  hovered: boolean = false;
  selected: boolean = false;
  fileStyles = {};
  fileBreadcrumbs: string[] = [];

  iconSpecificFile: string = '';

  ngOnInit() {
    this.fileBreadcrumbs = [...this.breadcrumbs];
    this.fileBreadcrumbs.push(this.file.name);

    this.selectIcon();
    this.calcDepth();
  }

  ngOnDestroy(): void {
    this.dragDropBuffer.clear();
    this.copyBuffer.clear();
  }

  onCopy() {
    this.copyBuffer.add(this.file);

    this.copyBufferSubject.next(this.file);
  }

  onDrag() {
    this.dragDropBuffer.add(this.file);
  }

  removeFileDialog() {
    const dialogRef = this.dialog.open(DeleteFileDialogComponent, {
      width: '400px',
      data: {
        name: this.file.name,
        id: this.file.id,
        codeProjectUuid: this.project.uuid,
      },
    });

    dialogRef.afterClosed().subscribe((decision) => {
      if (!decision) return;

      this.parentEvent.next(this.file);
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

      this.toggleActionSet = !this.toggleActionSet;
    });
  }

  showFile(): void {
    const file = deepcopy(this.file);
    file.path = this.fileBreadcrumbs;
    this.store.dispatch(httpGetFileContentAction(file));
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

  private selectIcon(): void {
    if (StaticFileWrapper.isJavascript(this.file)) {
      this.iconSpecificFile = "fab fa-js-square";
    } else if (StaticFileWrapper.isHtml(this.file)) {
      this.iconSpecificFile = "fab fa-html5";
    } else if (StaticFileWrapper.isJson(this.file)) {
      this.iconSpecificFile = "fab fa-js-square";
    }
  }

  private calcDepth(): void {
    const depth = this.file.depth;

    if (depth === 1) {
      this.fileStyles['padding-left'] = `${37}px`;

      return;
    }

    if (this.basePadding) {
      const pl: number = this.basePadding + 35;

      this.fileStyles['padding-left'] = `${pl}px`;

      return;
    }

/*    let depth = this.file.depth;

    if (this.file.searched) {
      depth = 1;
    }

    if (depth > 1) {
      depth = depth + 1;
    }

    let wBase = (depth === 1) ? 35 : 10;
    const w = 269 + (depth * wBase);
    const pl = depth * wBase;

    this.fileStyles['width'] = `${w}px`;
    this.fileStyles['padding-left'] = `${pl}px`;*/
  }
}

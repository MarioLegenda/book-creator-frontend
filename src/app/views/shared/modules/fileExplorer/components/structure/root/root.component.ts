import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/addFile/add-file-dialog.component";
import {DirectoryRepository} from "../../../../../../../repository/DirectoryRepository";
import {AddDirectoryDialogComponent} from "../modals/addDirectory/add-directory-dialog.component";
import {Store} from "@ngrx/store";
import {DeleteDirectoryDialogComponent} from "../modals/deleteDirectory/delete-directory-dialog.component";
import {EditDirectoryDialogComponent} from "../modals/editDirectory/edit-directory-dialog.component";
import {HttpModel} from "../../../../../../../model/http/HttpModel";
import {DragDropBuffer} from "../../../services/DragDropBuffer";
import {CopyBuffer} from "../../../services/CopyBuffer";
import {Subject, Subscription} from "rxjs";
import {IDirectory} from "../../../models/IDirectory";
import {IFile} from "../../../models/IFile";
import {ErrorCodes} from "../../../../../../../error/ErrorCodes";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IBufferEvent} from "../../../models/IBufferEvent";
import {FileRepository} from "../../../../../../../repository/FileRepository";
import {ICutFinishedEvent} from "../../../models/ICutFinishedEvent";

@Component({
  selector: 'cms-root-directory',
  styleUrls: [
    '../global-actions.component.scss',
    './root.component.scss',
  ],
  templateUrl: './root.component.html',
})
export class RootComponent implements OnInit, OnDestroy {
  @Input('directory') directory: IDirectory;
  @Input('extension') extension: string;
  @Input('selectedItem') selectedItem: any;
  @Input('project') project: any;

  @Input('copyBufferSubject') copyBufferSubject: Subject<any>;
  @Input('copyUnbufferSubject') copyUnbufferSubject: Subject<any>;
  @Input('fileCutFinishedEvent') fileCutFinishedEvent: Subject<ICutFinishedEvent>

  private copyBufferSubscriber: Subscription;
  private copyUnbuffeerSubscriber: Subscription;

  structure = [];

  expandedPadding: number;

  selected: boolean = false;
  draggedOver: boolean = false;
  copyExpected: boolean = false;
  dirStyles = {};
  icons = {
    angle: 'fas fa-angle-right',
    editDirectory: 'far fa-edit',
    dirCaret: 'fas fa-folder-open',
    newFile: 'fas fa-file-code',
    newDir: 'fas fa-folder-plus',
    removeDirectory: 'far fa-trash-alt',
  };

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private directoryRepository: DirectoryRepository,
    private fileRepository: FileRepository,
    private dragDropBuffer: DragDropBuffer,
    private copyBuffer: CopyBuffer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.setNestedPosition();
    this.listenToCopyBuffers();
    this.listenToFileCutEvents();

    const tempSubject = new Subject();

    this.getStructure(tempSubject);

    tempSubject.subscribe((structure: any[]) => {
      this.structure = structure;
    });
  }

  ngOnDestroy(): void {
    this.doOnDestroy();
  }

  onDrop(): void {
    this.doDrop();
  }

  onDrag(): void {
    this.dragDropBuffer.add(this.directory);
  }

  onDragOver($event): void {
    $event.preventDefault();
  }

  onDragEnter(): void {
    this.draggedOver = true;
  }

  onDragExit() {
    this.draggedOver = false;
  }

  onPaste(): void {
    this.doPaste();
  }

  removeDirectoryDialog(): void {
    this.doRemoveDirectory();
  }

  newDirectory(): void {
    this.doNewDirectory();
  }

  newFile(): void {
    this.doNewFile();
  }

  private setNestedPosition() {
    const w = 269 + (this.directory.depth * 17);
    const pl = this.directory.depth * 17;

    this.dirStyles['width'] = `${w}px`;
    this.dirStyles['padding-left'] = `${pl}px`;

    this.expandedPadding = pl;
  }

  private doNewDirectory(): void {
    const data = {
      codeProjectUuid: this.directory.codeProjectUuid,
      name: '',
      id: this.directory.id,
      type: 'directory',
      isRoot: false,
    };

    const dialogRef = this.dialog.open(AddDirectoryDialogComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((resolver) => {
      if (!resolver) return;

      const directory = resolver.factory(this.project.uuid, resolver.originalModel);

      this.structure.push(directory);
    });
  }

  private doEditDirectory(): void {
    const data = {
      codeProjectUuid: this.directory.codeProjectUuid,
      name: this.directory.name,
      id: this.directory.id,
      depth: this.directory.depth,
      type: 'directory',
      isRoot: false,
      extension: this.extension,
    };

    const dialogRef = this.dialog.open(EditDirectoryDialogComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((resolver) => {
      if (!resolver) return;

      if (resolver) {
        const directory = resolver.factory(this.directory.codeProjectUuid, resolver.originalModel);

        this.directory.name = directory.name;
      }
    });
  }

  private doNewFile(): void {
    const data = {
      name: '',
      id: '',
      directoryId: this.directory.id,
      content: '',
      type: '',
      codeProjectUuid: this.directory.codeProjectUuid,
      extension: this.extension,
    };

    const dialogRef = this.dialog.open(AddFileDialogComponent, {
      width: '400px',
      data: data,
    });

    dialogRef.afterClosed().subscribe((model) => {
      if (!model) return;

      if (model.type && model.type === 'error') {

      } else {
        this.structure.push(model);
      }
    });
  }

  private doDrop() {
    const value = this.dragDropBuffer.get();

    if (value.type === 'file' && value.depth === this.directory.depth) {
      this.draggedOver = false;

      return;
    }

    if (value.type === 'directory') {
      if (
        value.name === this.directory.name &&
        value.depth == this.directory.depth) {
        this.draggedOver = false;

        return;
      }

      const fromDirectoryId = value.id;
      const toDirectoryId = this.directory.id;
      const codeProjectUuid = this.directory.codeProjectUuid;

      const model = HttpModel.cutDirectory(fromDirectoryId, toDirectoryId, codeProjectUuid);

      let failed: boolean = false;
      this.directoryRepository.cutDirectory(model).subscribe((response) => {

        const cuttedDirectory = response.fromDirectory;
        cuttedDirectory.type = 'directory';
      }, (e) => {
        const response = e.error;

        if (response.errorCode === ErrorCodes.ResourceExists) {
          if (!failed) {
            this.snackBar.open('Some files or directories already exist and could not be cut', null, {
              duration: 5000,
            });
          }

          failed = true;
        } else if (response.errorCode === ErrorCodes.InternalError) {
          if (!failed) {
            this.snackBar.open('An internal error happened and directory could not be cut', null, {
              duration: 5000,
            });
          }

          failed = true;
        }
      });
    }

    if (value.type === 'file') {
      const fileId: string = value.id;
      const directoryId: string = this.directory.id;
      const codeProjectUuid: string = this.directory.codeProjectUuid;

      const model = HttpModel.cutFile(fileId, directoryId, codeProjectUuid);

      let failed: boolean = false;
      this.directoryRepository.cutFile(model).subscribe((cuttedFile: IFile) => {
        this.structure.push(cuttedFile);

        this.fileCutFinishedEvent.next(value);
      },(e) => {
        const response = e.error;

        if (response.errorCode === ErrorCodes.ResourceExists) {
          if (!failed) {
            this.snackBar.open('Some files or directories already exist and could not be cut', null, {
              duration: 5000,
            });
          }

          failed = true;
        } else {
          if (!failed) {
            this.snackBar.open('An internal error happened and directory could not be cut', null, {
              duration: 5000,
            });
          }

          failed = true;
        }
      });
    }

    this.draggedOver = false;
  }

  private doPaste() {
    if (this.copyExpected) {
      const values = this.copyBuffer.get();

      let failedCopies: boolean = false;
      let didExpand = false;

      for (const value of values) {
        if (value.type === 'directory') {
          const model = HttpModel.copyDirectory(
            value.id,
            this.directory.id,
            this.directory.codeProjectUuid,
          );

          this.directoryRepository.copyDirectory(model).subscribe((copiedDirectory: IDirectory) => {
            console.log(copiedDirectory);
          }, (e) => {
            const response = e.error;

            if (response.errorCode === ErrorCodes.ResourceExists) {
              if (!failedCopies) {
                this.snackBar.open('Some files or directories already exist and could not be copied', null, {
                  duration: 5000,
                });
              }

              failedCopies = true;
            } else {
              if (!failedCopies) {
                this.snackBar.open('An internal error happened and directory could not be cut', null, {
                  duration: 5000,
                });
              }

              failedCopies = true;
            }
          });
        }

        if (value.type === 'file') {
          const model = HttpModel.copyFile(
            value.id,
            this.directory.id,
            this.directory.codeProjectUuid
          );

          this.directoryRepository.copyFile(model).subscribe((copiedFile: IFile) => {
            if (this.directory.isRoot) {
              this.copyUnbufferSubject.next();

              return;
            }
          }, (e) => {
            const response = e.error;

            if (response.errorCode === ErrorCodes.ResourceExists) {
              if (!failedCopies) {
                this.snackBar.open('Some files or directories already exist and could not be copied', null, {
                  duration: 5000,
                });
              }

              failedCopies = true;
            } else if (response.errorCode === ErrorCodes.InternalError) {
              if (!failedCopies) {
                this.snackBar.open('An internal error happened and files or directories could not be copied', null, {
                  duration: 5000,
                });
              }

              failedCopies = true;
            } else {
              if (!failedCopies) {
                this.snackBar.open('An internal error happened and directory could not be cut', null, {
                  duration: 5000,
                });
              }

              failedCopies = true;
            }
          });
        }
      }

      this.copyExpected = false;

      this.copyUnbufferSubject.next();
    }
  }

  private doOnDestroy() {
    this.copyBufferSubscriber.unsubscribe();
    this.copyUnbuffeerSubscriber.unsubscribe();
    this.copyUnbuffeerSubscriber = null;
    this.copyBufferSubscriber = null;
  }

  private doRemoveDirectory(): void {
    const dialogRef = this.dialog.open(DeleteDirectoryDialogComponent, {
      width: '400px',
      data: {name: this.directory.name},
    });

    dialogRef.afterClosed().subscribe((decision) => {
      if (decision !== true) return;

      const model = HttpModel.removeDirectoryModel(
        this.directory.codeProjectUuid,
        this.directory.id,
      );

      this.directoryRepository.removeDirectory(model).subscribe(() => {
      });
    });
  }

  private getStructure(subject: Subject<any>) {
    this.directoryRepository.getSubdirectories(this.project.uuid, this.directory.id).subscribe((resolver) => {
      const structure = [];

      const models = resolver.factory(this.project.uuid, resolver.originalModel);

      for (const model of models) {
        structure.push(model);
      }

      this.fileRepository.getFilesFromDirectory(this.project.uuid, this.directory.id).subscribe((resolver) => {
        const models = resolver.factory(this.project.uuid, resolver.originalModel);
        for (const model of models) {
          structure.push(model);
        }

        subject.next(structure);
      });
    });
  }

  private listenToCopyBuffers(): void {
    this.copyBufferSubscriber = this.copyBufferSubject.subscribe((event: IBufferEvent) => {
      if (event.id !== this.directory.id) {
        this.copyExpected = true;
      }
    });

    this.copyUnbuffeerSubscriber = this.copyUnbufferSubject.subscribe(() => {
      this.copyExpected = false;
    });
  }

  private listenToFileCutEvents(): void {
    this.fileCutFinishedEvent.subscribe((event: ICutFinishedEvent) => {
      const idx: number = this.structure.findIndex(a => {
        return (a.id === event.id && a.type === 'file' && this.directory.id === event.directoryId);
      });

      if (idx === -1) return;

      this.structure.splice(idx, 1);
    });
  }
}

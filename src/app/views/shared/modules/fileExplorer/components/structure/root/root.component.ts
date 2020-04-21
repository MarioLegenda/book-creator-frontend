import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/addFile/add-file-dialog.component";
import {DirectoryRepository} from "../../../../../../../repository/DirectoryRepository";
import {AddDirectoryDialogComponent} from "../modals/addDirectory/add-directory-dialog.component";
import {Store} from "@ngrx/store";
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
import {IParentEvent} from "../../../models/IParentEvent";
import {getStructure} from "../shared/_protectedDirectoryFns";
import {ICodeProject} from "../../../../../../codeEditor/models/ICodeProject";

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
  @Input('project') project: ICodeProject;

  @Input('copyBufferSubject') copyBufferSubject: Subject<any>;
  @Input('copyUnbufferSubject') copyUnbufferSubject: Subject<any>;
  @Input('fileCutFinishedEvent') fileCutFinishedEvent: Subject<ICutFinishedEvent>
  @Input('directoryCutFinishedEvent') directoryCutFinishedEvent: Subject<ICutFinishedEvent>

  private copyBufferSubscriber: Subscription;
  private copyUnbuffeerSubscriber: Subscription;
  private parentEventSubscription: Subscription;
  private fileCutEventSubscription: Subscription;
  private directoryCutEventSubscription: Subscription;

  structure = [];

  expandedPadding: number;

  parentCommunicator: Subject<IParentEvent>;

  draggedOver: boolean = false;
  copyExpected: boolean = false;
  dirStyles = {};

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private directoryRepository: DirectoryRepository,
    private fileRepository: FileRepository,
    private dragDropBuffer: DragDropBuffer,
    private copyBuffer: CopyBuffer,
    private snackBar: MatSnackBar
  ) {
    this.parentCommunicator = new Subject<IParentEvent>();
  }

  ngOnInit() {
    this.setNestedPosition();
    this.listenToCopyBuffers();
    this.listenToFileCutEvents();
    this.listenToDirectoryCutEvents();
    this.initRootStructure();
    this.subscribeToChildEvents();
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

      this.structure.unshift(directory);
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

      this.structure.push(model);
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

  private doOnDestroy(): void {
    this.copyBufferSubscriber.unsubscribe();
    this.copyUnbuffeerSubscriber.unsubscribe();
    this.parentEventSubscription.unsubscribe();
    this.fileCutEventSubscription.unsubscribe();
    this.directoryCutEventSubscription.unsubscribe();
    this.fileCutEventSubscription = null;
    this.directoryCutEventSubscription = null;
    this.parentEventSubscription = null;
    this.copyUnbuffeerSubscriber = null;
    this.copyBufferSubscriber = null;
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

  private listenToDirectoryCutEvents(): void {
    this.directoryCutFinishedEvent.subscribe((event: ICutFinishedEvent) => {
      const idx: number = this.structure.findIndex(a => {
        return (a.id === event.id && a.type === 'directory');
      });

      if (idx === -1) return;

      this.structure.splice(idx, 1);
    });
  }

  private initRootStructure(): void {
    const tempSubject = new Subject();

    getStructure.call(this, tempSubject);

    const tempSubscriber: Subscription = tempSubject.subscribe((structure: any[]) => {
      this.structure = structure;

      tempSubscriber.unsubscribe();
    });
  }

  private subscribeToChildEvents(): void {
    this.parentEventSubscription = this.parentCommunicator.subscribe((event: IParentEvent) => {
      const idx: number = this.structure.findIndex(a => a.id === event.id && a.type === event.type);

      if (idx === -1) return;

      this.structure.splice(idx, 1);
    });
  }
}

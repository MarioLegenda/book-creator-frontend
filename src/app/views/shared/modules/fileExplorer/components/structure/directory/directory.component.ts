import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/addFile/add-file-dialog.component";
import {FileSystemRepository} from "../../../../../../../repository/FileSystemRepository";
import {AddDirectoryDialogComponent} from "../modals/addDirectory/add-directory-dialog.component";
import {Store} from "@ngrx/store";
import {HttpModel} from "../../../../../../../model/http/HttpModel";
import {DragDropBuffer} from "../../../services/DragDropBuffer";
import {CopyBuffer} from "../../../services/CopyBuffer";
import {ReplaySubject, Subject, Subscription} from "rxjs";
import {IDirectory} from "../../../models/IDirectory";
import {IFile} from "../../../models/IFile";
import {ErrorCodes} from "../../../../../../../error/ErrorCodes";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IBufferEvent} from "../../../models/IBufferEvent";
import {FileRepository} from "../../../../../../../repository/FileRepository";
import {ICutFinishedEvent} from "../../../models/ICutFinishedEvent";
import {doEditDirectory, getStructure, removeDirectory} from "../shared/_protectedDirectoryFns";
import {IParentEvent} from "../../../models/IParentEvent";
import {ICodeProject} from "../../../../../../codeEditor/models/ICodeProject";

@Component({
  selector: 'cms-directory',
  styleUrls: [
    '../global-actions.component.scss',
    './directory.component.scss',
  ],
  templateUrl: './directory.component.html',
})
export class DirectoryComponent implements OnInit, OnDestroy {
  @Input('directory') directory: IDirectory;
  @Input('extension') extension: string;
  @Input('project') project: ICodeProject;
  @Input('breadcrumbs') breadcrumbs: string[];

  @Input('copyBufferSubject') copyBufferSubject: Subject<any>;
  @Input('copyUnbufferSubject') copyUnbufferSubject: Subject<any>;
  @Input('fileCutFinishedEvent') fileCutFinishedEvent: Subject<ICutFinishedEvent>;
  @Input('directoryCutFinishedEvent') directoryCutFinishedEvent: Subject<ICutFinishedEvent>;
  @Input('parentEvent') parentEvent: Subject<IParentEvent>;

  private copyBufferSubscriber: Subscription;
  private copyUnbuffeerSubscriber: Subscription;
  private parentEventSubscription: Subscription;

  structure = [];
  dirBreadcrumbs: string[];

  expandedPadding: number;

  parentCommunicator: Subject<IParentEvent>;
  fileCutEventSubscription: Subscription;
  directoryCutEventSubscription: Subscription;

  toggleActionSet: boolean = false;
  expanded: boolean = false;
  draggedOver: boolean = false;
  copyExpected: boolean = false;
  dirStyles = {};
  expandedIcon = 'fas fa-angle-right';

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private fileSystemRepository: FileSystemRepository,
    private fileRepository: FileRepository,
    private dragDropBuffer: DragDropBuffer,
    private copyBuffer: CopyBuffer,
    private snackBar: MatSnackBar
  ) {
    this.parentCommunicator = new Subject<IParentEvent>();
  }

  ngOnInit() {
    this.dirBreadcrumbs = [...this.breadcrumbs];
    this.dirBreadcrumbs.push(this.directory.name);

    this.setNestedPosition();
    this.listenToCopyBuffers();
    this.listenToFileCutEvents();
    this.listenToDirectoryCutEvents();
    this.subscribeToChildEvents();
  }

  ngOnDestroy(): void {
    this.doOnDestroy();
  }

  loadStructure() {
    this.doLoadStructure();
  }

  onCopy(): void {
    this.copyBuffer.add(this.directory);

    this.copyBufferSubject.next(this.directory);
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
    removeDirectory.call(this);
  }

  newFileDialog(): void {
    this.doNewFile();
  }

  newDirectoryDialog(): void {
    this.doNewDirectory();
  }

  editDirectoryDialog(): void {
    doEditDirectory.call(this);
  }

  private expandDirectory(): void {
    this.expandedIcon = 'fas fa-angle-down';

    this.expanded = true;
  }

  private unExpandDirectory(): void {
    if (this.directory.isRoot) return;

    this.expandedIcon = 'fas fa-angle-right';

    this.expanded = false;
  }

  private setNestedPosition() {
    const depth = this.directory.depth;

    let w;
    let pl;

    if (depth === 2) {
      w = 269 + (depth * 5);
      pl = depth * 5;
    } else {
      w = 269 + (depth * 7);
      pl = depth * 7;
    }


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

      if (!this.expanded) {
        this.doLoadStructure().subscribe(() => {
          this.toggleActionSet = !this.toggleActionSet;
        });
      } else {
        const directory = resolver.factory(this.project.uuid, resolver.originalModel);

        this.structure.unshift(directory);
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

    dialogRef.afterClosed().subscribe((model: IFile) => {
      if (!model) return;

      if (!this.expanded) {
        this.doLoadStructure().subscribe(() => {
          this.toggleActionSet = !this.toggleActionSet;
        });
      } else {
        this.structure.push(model);
        this.toggleActionSet = !this.toggleActionSet;
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
      this.fileSystemRepository.cutDirectory(model).subscribe((response) => {
        const cuttedDirectory = response.fromDirectory;
        cuttedDirectory.type = 'directory';

        if (!this.expanded) {
          this.doLoadStructure().subscribe(() => {
            this.directoryCutFinishedEvent.next(value);
          });
        } else {
          this.structure.unshift(cuttedDirectory);

          this.directoryCutFinishedEvent.next(value);
        }
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
      this.fileSystemRepository.cutFile(model).subscribe((cuttedFile: IFile) => {
        if (!this.expanded) {
          this.doLoadStructure().subscribe(() => {
            this.fileCutFinishedEvent.next(value);
          });
        } else {
          this.structure.push(cuttedFile);

          this.fileCutFinishedEvent.next(value);
        }
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

          this.fileSystemRepository.copyDirectory(model).subscribe((copiedDirectory: IDirectory) => {
            if (!this.expanded) {
              this.doLoadStructure().subscribe(() => {
                this.toggleActionSet = !this.toggleActionSet;
              });
            } else {
              copiedDirectory.type = 'directory';
              this.structure.unshift(copiedDirectory);

              this.expandDirectory();

              this.toggleActionSet = !this.toggleActionSet;
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

          this.fileSystemRepository.copyFile(model).subscribe((copiedFile: IFile) => {
            if (!this.expanded) {
              this.doLoadStructure().subscribe(() => {
                this.toggleActionSet = !this.toggleActionSet;
              });
            } else {
              copiedFile.type = 'file';
              this.structure.unshift(copiedFile);

              this.expandDirectory();

              this.toggleActionSet = !this.toggleActionSet;
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
    if (this.copyBufferSubscriber) {
      this.copyBufferSubscriber.unsubscribe();
      this.copyBufferSubscriber = null;
    }

    if (this.copyUnbuffeerSubscriber) {
      this.copyUnbuffeerSubscriber.unsubscribe();
      this.copyUnbuffeerSubscriber = null;
    }

    if (this.parentEventSubscription) {
      this.parentEventSubscription.unsubscribe();
      this.parentEventSubscription = null;
    }

    if (this.fileCutEventSubscription) {
      this.fileCutEventSubscription.unsubscribe();
      this.fileCutEventSubscription = null;
    }

    if (this.directoryCutEventSubscription) {
      this.directoryCutEventSubscription.unsubscribe();
      this.directoryCutEventSubscription = null;
    }

    this.dragDropBuffer.clear();
    this.copyBuffer.clear();
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
    this.fileCutEventSubscription = this.fileCutFinishedEvent.subscribe((event: ICutFinishedEvent) => {
      const idx: number = this.structure.findIndex(a => {
        return (a.id === event.id && a.type === 'file' && this.directory.id === event.directoryId);
      });

      if (idx === -1) return;

      this.structure.splice(idx, 1);
    });
  }

  private listenToDirectoryCutEvents(): void {
    this.directoryCutEventSubscription = this.directoryCutFinishedEvent.subscribe((event: ICutFinishedEvent) => {
      const idx: number = this.structure.findIndex(a => {
        return (a.id === event.id && a.type === 'directory' && this.directory.id === event.parent);
      });

      if (idx === -1) return;

      this.structure.splice(idx, 1);
    });
  }

  private doLoadStructure(): ReplaySubject<void> {
    const finishedSubject = new ReplaySubject<void>();

    if (this.expanded) {
      this.unExpandDirectory();

      this.structure = [];

      return finishedSubject;
    }

    let tempSubject = new Subject();

    getStructure.call(this, tempSubject);

    tempSubject.subscribe((structure: any[]) => {
      this.structure = structure;

      this.expandDirectory();

      finishedSubject.next();
    });

    return finishedSubject;
  }

  private subscribeToChildEvents(): void {
    this.parentEventSubscription = this.parentCommunicator.subscribe((event: IParentEvent) => {
      const idx: number = this.structure.findIndex(a => a.id === event.id && a.type ===  event.type);

      if (idx === -1) return;

      this.structure.splice(idx, 1);
    });
  }
}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/addFile/add-file-dialog.component";
import {DirectoryRepository} from "../../../../../../../repository/DirectoryRepository";
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
  @Input('project') project: any;

  @Input('copyBufferSubject') copyBufferSubject: Subject<any>;
  @Input('copyUnbufferSubject') copyUnbufferSubject: Subject<any>;
  @Input('fileCutFinishedEvent') fileCutFinishedEvent: Subject<ICutFinishedEvent>;
  @Input('parentEvent') parentEvent: Subject<IParentEvent>;

  private copyBufferSubscriber: Subscription;
  private copyUnbuffeerSubscriber: Subscription;
  private parentEventSubscription: Subscription;

  structure = [];

  expandedPadding: number;

  parentCommunicator: Subject<IParentEvent>;

  toggleActionSet: boolean = false;
  expanded: boolean = false;
  draggedOver: boolean = false;
  copyExpected: boolean = false;
  dirStyles = {};
  icons = {
    angle: 'fas fa-angle-right',
    editDirectory: 'far fa-edit',
    dirCaret: 'fas fa-folder',
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
  ) {
    this.parentCommunicator = new Subject<IParentEvent>();
  }

  ngOnInit() {
    this.setNestedPosition();
    this.listenToCopyBuffers();
    this.listenToFileCutEvents();
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

  onExpandDirectory(): void {
    if (!this.expanded) {
      this.expandDirectory();
    } else if (this.expanded) {
      this.unExpandDirectory();
    }
  }

  private expandDirectory(): void {
    this.icons.angle = 'fas fa-angle-down';

    this.expanded = true;
  }

  private unExpandDirectory(): void {
    if (this.directory.isRoot) return;

    this.icons.angle = 'fas fa-angle-right';

    this.expanded = false;
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
      this.directoryRepository.cutDirectory(model).subscribe((response) => {

        const cuttedDirectory = response.fromDirectory;
        cuttedDirectory.type = 'directory';

        if (this.directory.isRoot) {
        }

        if (!this.directory.isRoot) {
          if (!this.expanded) {
            this.onExpandDirectory();
          } else {
            this.expandDirectory();
          }
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
      this.directoryRepository.cutFile(model).subscribe((cuttedFile: IFile) => {
        this.structure.push(cuttedFile);

        this.fileCutFinishedEvent.next(value);

        if (!this.expanded) {
          this.expandDirectory();
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

            if (!this.expanded) {
              this.expandDirectory();
              didExpand = true;
            }

            if (!didExpand) {
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
    this.parentEventSubscription.unsubscribe();
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

  private doLoadStructure(): ReplaySubject<void> {
    const finishedSubject = new ReplaySubject<void>();

    if (this.expanded) {
      this.unExpandDirectory();

      this.structure = [];

      return finishedSubject;
    }

    let tempSubject = new Subject();

    getStructure.call(this, tempSubject);

    const tempSubscriber: Subscription = tempSubject.subscribe((structure: any[]) => {
      this.expandDirectory();

      this.structure = structure;

      tempSubscriber.unsubscribe();

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

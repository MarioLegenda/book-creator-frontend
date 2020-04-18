import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/addFile/add-file-dialog.component";
import {DirectoryRepository} from "../../../../../../../repository/DirectoryRepository";
import {AddDirectoryDialogComponent} from "../modals/addDirectory/add-directory-dialog.component";
import {select, Store} from "@ngrx/store";
import {actionTypes, viewEditorShowFile} from "../../../../../../../store/editor/viewActions";
import {DeleteDirectoryDialogComponent} from "../modals/deleteDirectory/delete-directory-dialog.component";
import {EditDirectoryDialogComponent} from "../modals/editDirectory/edit-directory-dialog.component";
import {HttpModel} from "../../../../../../../model/http/HttpModel";
import {DragDropBuffer} from "../../../services/DragDropBuffer";
import {CopyBuffer} from "../../../services/CopyBuffer";
import {Subject, Subscription} from "rxjs";
import {IDirectory} from "../../../models/IDirectory";
import {IFile} from "../../../models/IFile";
import {IAddFileEvent} from "../../../models/IAddFileEvent";
import {ErrorCodes} from "../../../../../../../error/ErrorCodes";
import {MatSnackBar} from "@angular/material/snack-bar";
import {IRemoveDirectoryEvent} from "../../../models/IRemoveDirectoryEvent";
import {IBufferEvent} from "../../../models/IBufferEvent";

@Component({
  selector: 'cms-directory',
  styleUrls: [
    '../global-actions.component.scss',
    './directory.component.scss',
  ],
  templateUrl: './directory.component.html',
})
export class DirectoryComponent implements OnInit, OnChanges, OnDestroy {
  @Input('directory') directory: IDirectory;
  @Input('extension') extension: string;
  @Input('selectedItem') selectedItem: any;

  @Input('copyBufferSubject') copyBufferSubject: Subject<any>;
  @Input('copyUnbufferSubject') copyUnbufferSubject: Subject<any>;

  @Output('removeDirectoryEvent') removeDirectoryEvent = new EventEmitter<IRemoveDirectoryEvent>();
  @Output('expandDirectoryEvent') expandDirectoryEvent = new EventEmitter<IDirectory>();
  @Output('unExpandDirectoryEvent') unExpandDirectoryEvent = new EventEmitter<IDirectory>();
  @Output('addDirectoryEvent') addDirectoryEvent = new EventEmitter();
  @Output('refreshEvent') refreshEvent = new EventEmitter();
  @Output('addFileEvent') addFileEvent = new EventEmitter<IAddFileEvent>();
  @Output('directoryAttachedEvent') directoryAttachedEvent = new EventEmitter();

  // only used with drag/drop
  @Output('fileRemovedEvent') fileRemovedEvent = new EventEmitter<IFile>();

  private editorViewActions;
  private copyBufferSubscriber: Subscription;
  private copyUnbuffeerSubscriber: Subscription;

  expanded: boolean = false;
  hovered: boolean = false;
  selected: boolean = false;
  attachActionSet: boolean = false;
  draggedOver: boolean = false;
  copyExpected: boolean = false;
  dirStyles = {};
  icons = {
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
    private dragDropBuffer: DragDropBuffer,
    private copyBuffer: CopyBuffer,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.setNestedPosition();
    this.runRootSpecificActions();
    this.subscribeToActions();

    this.copyBufferSubscriber = this.copyBufferSubject.subscribe((event: IBufferEvent) => {
      if (event.id !== this.directory.id) {
        this.copyExpected = true;
      }
    });

    this.copyUnbuffeerSubscriber = this.copyUnbufferSubject.subscribe(() => {
      this.copyExpected = false;
    });
  }

  ngOnDestroy(): void {
    this.doOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.doOnChanges(changes);
  }

  onCopy(): void {
    this.copyBuffer.add(this.directory);

    this.copyBufferSubject.next(this.directory);
  }

  onDrop(): void {
    this.doDrop();
  }

  onRefresh(): void {
    this.refreshEvent.emit();
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

  onPasteToRoot(): void {
    if (!this.directory.isRoot) return;

    this.doPaste();
  }

  directoryHovered(): void {
    this.hovered = true;
  }

  directoryUnHovered(): void {
    this.hovered = false;
  }

  removeDirectoryDialog(): void {
    this.doRemoveDirectory();
  }

  newFileDialog(): void {
    this.doNewFile();
  }

  newDirectoryFromRootDialog(): void {
    this.doNewDirectory();
  }

  newFileFromRootDialog(): void {
    this.doNewFile();
  }

  newDirectoryDialog(): void {
    this.doNewDirectory();
  }

  editDirectoryDialog(): void {
    this.doEditDirectory();
  }

  onExpandDirectory(): void {
    this.selected = true;
    this.attachActionSet = true;
    this.directoryAttachedEvent.emit({
      type: 'directory',
      id: this.directory.id,
    });

    if (!this.expanded) {
      this.expandDirectory();
      this.sendExpandDirectoryEvent();
    } else if (this.expanded) {
      this.unExpandDirectory();
      this.sendUnExpandDirectoryEvent();
    }
  }

  private expandDirectory(): void {
    this.icons.dirCaret = 'fas fa-folder-open';

    this.expanded = true;
  }

  private unExpandDirectory(): void {
    if (this.directory.isRoot) return;

    this.icons.dirCaret = 'fas fa-folder';

    this.expanded = false;
  }

  private sendUnExpandDirectoryEvent(): void {
    this.unExpandDirectoryEvent.emit(this.directory);
  }

  private sendExpandDirectoryEvent(): void {
    this.expandDirectoryEvent.emit(this.directory);
  }

  private changeIconIfRoot(): void {
    if (this.directory.isRoot) {
      this.icons.dirCaret = 'fas fa-folder-open';
    }
  }

  private setNestedPosition() {
    const w = 269 + (this.directory.depth * 15);
    const pl = this.directory.depth * 15;

    this.dirStyles['width'] = `${w}px`;
    this.dirStyles['padding-left'] = `${pl}px`;
  }

  private runRootSpecificActions() {
    if (this.directory.isRoot) {
      this.expandDirectory();
      this.sendExpandDirectoryEvent();
      this.changeIconIfRoot();
    }
  }

  private subscribeToActions() {
    this.editorViewActions = this.store.pipe(select('editorViewActions')).subscribe((action) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.VIEW_EDITOR_DIRECTORY_EMPTIED: {
          if (action.directoryId === this.directory.id) {
            this.unExpandDirectory();
            this.sendUnExpandDirectoryEvent();
          }
        }
      }
    });
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

      if (resolver) {
        this.addDirectoryEvent.emit({
          parent: this.directory,
          created: resolver.factory(this.directory.codeProjectUuid, resolver.originalModel),
        });

        if (!this.expanded) {
          this.expandDirectory();
        }
      }
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
        this.store.dispatch(viewEditorShowFile(model));

        this.addFileEvent.emit({
          parent: this.directory,
          file: model,
        });

        if (!this.expanded) {
          this.expandDirectory();
        }
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

      this.directoryRepository.cutDirectory(model).subscribe((response) => {
        const removeDirectoryEvent = {
          directory: (value as IDirectory),
          sendDirectoryEmptied: false,
        };

        this.removeDirectoryEvent.emit(removeDirectoryEvent);

        const cuttedDirectory = response.fromDirectory;
        cuttedDirectory.type = 'directory';

        if (this.directory.isRoot) {
          this.addDirectoryEvent.emit({
            parent: this.directory,
            created: cuttedDirectory,
          });
        }

        if (!this.directory.isRoot) {
          if (!this.expanded) {
            this.onExpandDirectory();
          } else {
            this.expandDirectory();

            this.addDirectoryEvent.emit({
              parent: this.directory,
              created: cuttedDirectory,
            });
          }
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
        this.fileRemovedEvent.emit(value);
        if (this.directory.isRoot) {
          this.addFileEvent.emit({
            parent: this.directory,
            file: cuttedFile,
          });

          return;
        }

        if (!this.expanded) {
          this.expandDirectory();
          this.sendExpandDirectoryEvent();
        } else {
          this.addFileEvent.emit({
            parent: this.directory,
            file: cuttedFile,
          });
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
              this.addFileEvent.emit({
                parent: this.directory,
                file: copiedFile,
              });

              this.copyUnbufferSubject.next();

              return;
            }

            if (!this.expanded) {
              this.expandDirectory();
              this.sendExpandDirectoryEvent();

              didExpand = true;
            }

            if (!didExpand) {
              this.addFileEvent.emit({
                parent: this.directory,
                file: copiedFile,
              });
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

  private doOnChanges(changes: SimpleChanges) {
    if (changes.selectedItem && !changes.selectedItem.firstChange) {
      const data = changes.selectedItem.currentValue;

      if (data.type === 'file') {
        this.attachActionSet = false;
        this.selected = false;
      } else if (data.id !== this.directory.id) {
        this.attachActionSet = false;
        this.selected = false;
      }
    }
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
        this.removeDirectoryEvent.emit({
          directory: this.directory,
          sendDirectoryEmptied: true,
        });
      });
    });
  }
}

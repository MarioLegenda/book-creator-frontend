import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/addFile/add-file-dialog.component";
import {DirectoryRepository} from "../../../../../../../repository/DirectoryRepository";
import {AddDirectoryDialogComponent} from "../modals/addDirectory/add-directory-dialog.component";
import {select, Store} from "@ngrx/store";
import {actionTypes, viewEditorShowFile} from "../../../../../../../store/editor/viewActions";
import {DeleteDirectoryDialogComponent} from "../modals/deleteDirectory/delete-directory-dialog.component";
import {EditDirectoryDialogComponent} from "../modals/editDirectory/edit-directory-dialog.component";
import {HttpModel} from "../../../../../../../model/http/HttpModel";

@Component({
  selector: 'cms-directory',
  styleUrls: [
    '../global-actions.component.scss',
    './directory.component.scss',
  ],
  templateUrl: './directory.component.html',
})
export class DirectoryComponent implements OnInit, OnChanges {
  @Input('directory') directory;
  @Input('extension') extension: string;
  @Input('selectedItem') selectedItem: any;

  @Output('removeDirectoryEvent') removeDirectoryEvent = new EventEmitter();
  @Output('expandDirectoryEvent') expandDirectoryEvent = new EventEmitter();
  @Output('unExpandDirectoryEvent') unExpandDirectoryEvent = new EventEmitter();
  @Output('addDirectoryEvent') addDirectoryEvent = new EventEmitter();
  @Output('addFileEvent') addFileEvent = new EventEmitter();
  @Output('directoryAttachedEvent') directoryAttachedEvent = new EventEmitter();

  private editorViewActions;

  componentState = {
    expanded: false,
    hovered: false,
    selected: false,
    attachActionSet: false,
    dirStyles: {},
    icons: {
      editDirectory: 'far fa-edit',
      dirCaret: 'far fa-folder',
      newFile: 'far fa-file-code',
      newDir: 'fas fa-folder-plus',
      removeDirectory: 'far fa-trash-alt',
    },
  };

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private directoryRepository: DirectoryRepository,
  ) {}

  ngOnInit() {
    this.setNestedPosition();
    this.runRootSpecificActions();
    this.subscribeToActions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedItem && !changes.selectedItem.firstChange) {
      const data = changes.selectedItem.currentValue;

      if (data.type === 'file') {
        this.componentState.attachActionSet = false;
        this.componentState.selected = false;
      } else if (data.id !== this.directory.id) {
        this.componentState.attachActionSet = false;
        this.componentState.selected = false;
      }
    }
  }

  directoryHovered() {
    this.componentState.hovered = true;
  }

  directoryUnHovered() {
    this.componentState.hovered = false;
  }

  removeDirectoryDialog($event) {
    $event.stopPropagation();

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
        this.removeDirectoryEvent.emit(this.directory);
      });
    });
  }

  newFileDialog($event): void {
    $event.stopPropagation();

    const data = {
      name: '',
      id: '',
      directoryId: this.directory.id,
      content: '',
      type: '',
      depth: this.directory.depth,
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

        if (!this.componentState.expanded) {
          this.expandDirectory();
        }
      }
    });
  }

  newDirectoryDialog($event): void {
    $event.stopPropagation();

    const data = {
      codeProjectUuid: this.directory.codeProjectUuid,
      name: '',
      id: this.directory.id,
      depth: this.directory.depth,
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

        if (!this.componentState.expanded) {
          this.expandDirectory();
        }
      }
    });
  }

  editDirectoryDialog($event): void {
    $event.stopPropagation();

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

  onExpandDirectory(): void {
    this.componentState.selected = true;
    this.componentState.attachActionSet = true;
    this.directoryAttachedEvent.emit({
      type: 'directory',
      id: this.directory.id,
    });

    if (!this.componentState.expanded) {
      this.expandDirectory();
      this.sendExpandDirectoryEvent();
    } else if (this.componentState.expanded) {
      this.unExpandDirectory();
      this.sendUnExpandDirectoryEvent();
    }
  }

  private expandDirectory(): void {
    this.componentState.icons.dirCaret = 'far fa-folder-open';

    this.componentState.expanded = true;
  }

  private unExpandDirectory(): void {
    if (this.directory.isRoot) return;

    this.componentState.icons.dirCaret = 'far fa-folder';

    this.componentState.expanded = false;
  }

  private sendUnExpandDirectoryEvent(): void {
    this.unExpandDirectoryEvent.emit(this.directory);
  }

  private sendExpandDirectoryEvent(): void {
    this.expandDirectoryEvent.emit(this.directory);
  }

  private changeIconIfRoot(): void {
    if (this.directory.isRoot) {
      this.componentState.icons.dirCaret = 'far fa-folder-open';
    }
  }

  private setNestedPosition() {
    const w = 269 + (this.directory.depth * 15);
    const pl = this.directory.depth * 15;

    this.componentState.dirStyles['width'] = `${w}px`;
    this.componentState.dirStyles['padding-left'] = `${pl}px`;
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
}

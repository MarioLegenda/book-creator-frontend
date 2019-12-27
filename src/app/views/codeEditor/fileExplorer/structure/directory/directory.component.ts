import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/file/add-file-dialog.component";
import {FileRepository} from "../../../../../repository/FileRepository";
import {DirectoryAppModel} from "../../../../../model/app/codeEditor/DirectoryAppModel";
import {FileAppModel} from "../../../../../model/app/codeEditor/FileAppModel";
import {DirectoryRepository} from "../../../../../repository/DirectoryRepository";
import {AddDirectoryDialogComponent} from "../modals/directory/add-directory-dialog.component";
import {select, Store} from "@ngrx/store";
import {actionTypes, viewEditorShowFile} from "../../../../../store/editor/viewActions";
import {DeleteDirectoryDialogComponent} from "../modals/deleteDirectory/delete-directory-dialog.component";

@Component({
  selector: 'cms-directory',
  styleUrls: [
    '../global-actions.component.scss',
    './directory.component.scss',
  ],
  templateUrl: './directory.component.html',
})
export class DirectoryComponent {
  @Input('directory') directory: DirectoryAppModel;
  @Output('removeDirectoryEvent') removeDirectoryEvent = new EventEmitter();
  @Output('expandDirectoryEvent') expandDirectoryEvent = new EventEmitter();
  @Output('unExpandDirectoryEvent') unExpandDirectoryEvent = new EventEmitter();
  @Output('addDirectoryEvent') addDirectoryEvent = new EventEmitter();
  @Output('addFileEvent') addFileEvent = new EventEmitter();

  private editorViewActions;

  componentState = {
    expanded: false,
    hovered: false,
    dirStyles: {},
    icons: {
      dirCaret: 'far fa-folder',
      newFile: 'far fa-file-code',
      newDir: 'fas fa-folder-plus',
      removeDirectory: 'far fa-trash-alt remove',
    },
  };

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private directoryRepository: DirectoryRepository,
  ) {}

  ngOnInit() {
    const w = 269 + (this.directory.depth * 15);
    this.componentState.dirStyles['width'] = `${w}px`;
    this.componentState.dirStyles['padding-left'] = `${this.directory.depth * 15}px`;
    if (this.directory.isRoot) {
      this.expandDirectory();
    }

    this.editorViewActions = this.store.pipe(select('editorViewActions')).subscribe((action) => {
      if (!action) {
        return;
      }

      switch (action.type) {
        case actionTypes.VIEW_EDITOR_DIRECTORY_EMPTIED: {
          if (action.directoryId === this.directory.directoryId) {
            this.expandDirectory();
          }
        }
      }
    });
  }

  directoryHovered() {
    this.componentState.hovered = true;
  }

  directoryUnHovered() {
    this.componentState.hovered = false;
  }

  removeDirectoryDialog() {
    const dialogRef = this.dialog.open(DeleteDirectoryDialogComponent, {
      width: '400px',
      data: {name: this.directory.name},
    });

    dialogRef.afterClosed().subscribe((decision) => {
      if (decision !== true) return;

      this.directoryRepository.removeDirectory(this.directory.directoryId).subscribe(() => {
        this.removeDirectoryEvent.emit(this.directory);
      });
    });
  }

  newFileDialog(): void {
    const dialogRef = this.dialog.open(AddFileDialogComponent, {
      width: '400px',
      data: new FileAppModel('','', this.directory.directoryId, '', ''),
    });

    dialogRef.afterClosed().subscribe((model: FileAppModel) => {
      if (model) {
        this.store.dispatch(viewEditorShowFile(model));

        if (!this.componentState.expanded) {
          this.expandDirectory();
        } else {
          this.addFileEvent.emit({
            parent: this.directory,
            file: model,
          })
        }
      }
    });
  }

  newDirectoryDialog(): void {
    const dialogRef = this.dialog.open(AddDirectoryDialogComponent, {
      width: '400px',
      data: new DirectoryAppModel(
        this.directory.codeProjectUuid,
        '',
        this.directory.directoryId,
        this.directory.depth,
        'directory',
        false,
      ),
    });

    dialogRef.afterClosed().subscribe((model: DirectoryAppModel) => {
      if (model) {
        this.addDirectoryEvent.emit({
          parent: this.directory,
          created: model,
        });

        if (!this.componentState.expanded) {
          this.expandDirectory();
        }
      }
    });
  }

  expandDirectory() {
    if (this.directory.isRoot) {
      this.componentState.icons.dirCaret = 'far fa-folder-open';

      return;
    }

    if (this.componentState.expanded) {
      this.componentState.icons.dirCaret = 'far fa-folder';

      this.componentState.expanded = false;

      this.unExpandDirectoryEvent.emit(this.directory);

      return;
    }

    if (!this.componentState.expanded) {
      this.componentState.icons.dirCaret = 'far fa-folder-open';

      this.componentState.expanded = true;

      this.expandDirectoryEvent.emit(this.directory);

      if (this.directory.structure.length > 0) {
        return;
      }
    }
  }
}

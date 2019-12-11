import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/file/add-file-dialog.component";
import {FileRepository} from "../../../../../repository/FileRepository";
import {DirectoryAppModel} from "../../../../../model/app/codeEditor/DirectoryAppModel";
import {FileHttpModel} from "../../../../../model/http/codeEditor/FileHttpModel";
import {FileAppModel} from "../../../../../model/app/codeEditor/FileAppModel";
import {DirectoryRepository} from "../../../../../repository/DirectoryRepository";
import {DirectoryHttpModel} from "../../../../../model/http/codeEditor/DirectoryHttpModel";
import {AddDirectoryDialogComponent} from "../modals/directory/add-directory-dialog.component";
import {Store} from "@ngrx/store";
import {httpGetFileContentAction} from "../../../../../store/editor/httpActions";
import {viewEditorShowFile} from "../../../../../store/editor/viewActions";

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

  componentState = {
    expanded: false,
    hovered: false,
    dirStyles: {},
    icons: {
      dirCaret: 'fas fa-angle-right',
      newFile: 'far fa-file-alt',
      newDir: 'fas fa-folder-plus',
      removeDirectory: 'far fa-trash-alt remove',
    },
  };

  constructor(
    private store: Store<any>,
    private dialog: MatDialog,
    private fileRepository: FileRepository,
    private directoryRepository: DirectoryRepository,
  ) {}

  ngOnInit() {
    this.componentState.dirStyles['padding-left'] = `${this.directory.depth * 15}px`;
    if (this.directory.isRoot) {
      this.expandDirectory();
    }
  }

  directoryHovered() {
    this.componentState.hovered = true;
  }

  directoryUnHovered() {
    this.componentState.hovered = false;
  }

  isDirectory(entry) {
    return entry.type === 'directory';
  }

  isFile(entry) {
    return entry.type === 'file';
  }

  removeDirectory() {
    this.directoryRepository.removeDirectory(this.directory.directoryId).subscribe(() => {
      this.removeDirectoryEvent.emit(this.directory);
    });
  }

  openFileDialog(): void {
    const dialogRef = this.dialog.open(AddFileDialogComponent, {
      width: '400px',
      data: new FileAppModel('','', this.directory.directoryId, '', ''),
    });

    dialogRef.afterClosed().subscribe((model: FileAppModel) => {
      if (model) {
        this.directory.structure.push(model);

        this.store.dispatch(viewEditorShowFile(model));

        if (!this.componentState.expanded) {
          this.expandDirectory();
        }
      }
    });
  }

  openDirectoryDialog(): void {
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
        this.directory.structure.push(model);

        if (!this.componentState.expanded) {
          this.expandDirectory();
        }
      }
    });
  }

  onFileRemoved(file) {
    const structure = this.directory.structure;
    for (let i = 0; structure.length > 0; i++) {
      if (structure[i].type === 'file' && file.id === structure[i].id) {
        this.directory.structure.splice(i, 1);

        break;
      }
    }
  }

  onRemoveDirectory(directory) {
    const structure = this.directory.structure;
    for (let i = 0; structure.length > 0; i++) {
      if (structure[i].type === 'directory' && directory.id === structure[i].id) {
        this.directory.structure.splice(i, 1);

        break;
      }
    }
  }

  expandDirectory() {
    if (this.componentState.expanded) {
      this.componentState.icons.dirCaret = 'fas fa-angle-right';

      this.componentState.expanded = false;

      return;
    }

    if (!this.componentState.expanded) {
      this.componentState.icons.dirCaret = 'fas fa-angle-down';

      this.componentState.expanded = true;

      if (this.directory.structure.length > 0) {
        return;
      }

      this.directoryRepository.getSubdirectories(this.directory.directoryId).subscribe((models: DirectoryHttpModel[]) => {
        for (const dir of models) {
          this.directory.structure.push(dir.convertToAppModel(this.directory.codeProjectUuid));
        }

        this.fileRepository.getFilesFromDirectory(this.directory.directoryId).subscribe((files: FileHttpModel[]) => {
          for (const file of files) {
            this.directory.structure.push(file.convertToAppModel(file.id));
          }
        });
      });
    }
  }
}

import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/file/add-file-dialog.component";
import {FileRepository} from "../../../../../repository/FileRepository";
import {DirectoryAppModel} from "../../../../../model/app/codeEditor/DirectoryAppModel";
import {FileHttpModel} from "../../../../../model/http/codeEditor/FileHttpModel";
import {FileAppModel} from "../../../../../model/app/codeEditor/FileAppModel";
import {DirectoryRepository} from "../../../../../repository/DirectoryRepository";
import {DirectoryHttpModel} from "../../../../../model/http/codeEditor/DirectoryHttpModel";
import {AddDirectoryDialogComponent} from "../modals/directory/add-directory-dialog.component";

@Component({
  selector: 'cms-directory',
  styleUrls: [
    './directory.component.scss',
  ],
  templateUrl: './directory.component.html',
})
export class DirectoryComponent {
  @Input('directory') directory: DirectoryAppModel;

  componentState = {
    expanded: false,
    hovered: false,
    dirStyles: {},
    icons: {
      dirCaret: 'fas fa-angle-right',
      newFile: 'far fa-file',
      newDir: 'far fa-folder',
    },
  };

  constructor(
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

  isDirectory(entry) {
    return entry.type === 'directory';
  }

  isFile(entry) {
    return entry.type === 'file';
  }

  openFileDialog(): void {
    const dialogRef = this.dialog.open(AddFileDialogComponent, {
      width: '300px',
      data: new FileAppModel('', this.directory.directoryId, '', ''),
    });

    dialogRef.afterClosed().subscribe((model: FileAppModel) => {
      if (model) {
        this.directory.structure.push(model);

        if (!this.componentState.expanded) {
          this.expandDirectory();
        }
      }
    });
  }

  openDirectoryDialog(): void {
    const dialogRef = this.dialog.open(AddDirectoryDialogComponent, {
      width: '300px',
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
            this.directory.structure.push(file.convertToAppModel());
          }
        });
      });
    }
  }
}

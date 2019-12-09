import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddFileDialogComponent} from "../modals/add-file-dialog.component";
import {FileRepository} from "../../../../../repository/FileRepository";
import {DirectoryAppModel} from "../../../../../model/app/codeEditor/DirectoryAppModel";
import {FileHttpModel} from "../../../../../model/http/codeEditor/FileHttpModel";
import {FileAppModel} from "../../../../../model/app/codeEditor/FileAppModel";

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
      if (model) this.directory.files.push(model);
    });
  }

  expandDirectory() {
    if (this.componentState.expanded) {
      this.componentState.icons.dirCaret = 'fas fa-angle-right';

      this.componentState.expanded = false;

      this.directory.files = [];

      return;
    }

    if (!this.componentState.expanded) {
      this.componentState.icons.dirCaret = 'fas fa-angle-down';

      this.componentState.expanded = true;

      this.fileRepository.getFilesFromDirectory(this.directory.directoryId).subscribe((files: FileHttpModel[]) => {
        for (const file of files) {
          this.directory.files.push(file.convertToAppModel());
        }
      });
    }
  }
}

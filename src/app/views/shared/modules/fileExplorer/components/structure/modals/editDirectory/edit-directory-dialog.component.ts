import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileSystemRepository} from "../../../../../../../../repository/FileSystemRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";
import {ErrorCodes} from "../../../../../../../../error/ErrorCodes";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-directory-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class EditDirectoryDialogComponent {
  directoryExists = null;
  directoryNotExists = null;
  rootRenameTried = null;
  noWhitespace = null;

  newName = '';

  createDisabled = false;

  constructor(
    private fileSystemRepository: FileSystemRepository,
    public dialogRef: MatDialogRef<EditDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  ngOnInit() {
    this.newName = this.model.name;
  }

  close(): void {
    this.dialogRef.close();
  }

  onModelChange() {
    this.directoryExists = null;
    this.noWhitespace = null;
    this.directoryNotExists = null;
    this.rootRenameTried = null;
  }

  editDirectory() {
    if (!this.newName) return;

    this.directoryExists = null;
    this.noWhitespace = null;
    this.directoryNotExists = null;
    this.rootRenameTried = null;

    this.createDisabled = true;

    if (!this.validateInput()) return;

    const model = HttpModel.renameDirectoryModel(
      this.model.codeProjectUuid,
      this.model.name,
      this.model.id,
      this.model.depth,
      this.newName,
    );

    this.fileSystemRepository.renameDirectory(model).then((resolver: any) => {
      if (resolver.error) {
        const errResponse = resolver.error;

        if (errResponse.errorCode === ErrorCodes.ResourceNotExists) {
          this.directoryNotExists = `Directory with name '${this.newName}' doesn't seem to exist anymore`;
        } else if (errResponse.errorCode === ErrorCodes.ResourceExists) {
          this.directoryExists = `Directory with name '${this.newName}' already exists.`;
        } else if (errResponse.errorCode === ErrorCodes.RootRenameTried) {
          this.directoryExists = `Directory with name '${this.newName}' is a root directory and cannot be renamed.`;
        }

        this.createDisabled = false;
      } else {
        this.dialogRef.close(resolver);
      }
    });
  }

  private validateInput(): boolean {
    const invalid = /\s/;

    if (invalid.test(this.newName)) {
      this.noWhitespace = `Invalid directory name. Whitespace in directory names are not allowed.`;

      this.createDisabled = false;

      return false;
    }

    return true;
  }
}

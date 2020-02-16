import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryRepository} from "../../../../../../../../repository/DirectoryRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";
import {ErrorCodes} from "../../../../../../../../error/ErrorCodes";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-directory-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class EditDirectoryDialogComponent {
  directoryExists = null;
  noWhitespace = null;

  createDisabled = false;

  constructor(
    private directoryRepository: DirectoryRepository,
    public dialogRef: MatDialogRef<EditDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  onModelChange() {
    this.directoryExists = null;
    this.noWhitespace = null;
  }

  editDirectory() {
    if (!this.model.name) return;

    this.directoryExists = null;
    this.noWhitespace = null;

    this.createDisabled = true;

    if (!this.validateInput()) return;

    const model = HttpModel.renameDirectoryModel(
      this.model.codeProjectUuid,
      this.model.name,
      this.model.id,
      this.model.depth,
      this.model.name,
    );

    this.directoryRepository.renameDirectory(model).then((resolver: any) => {
      if (resolver.error) {
        const errResponse = resolver.error;

        if (errResponse.errorCode === ErrorCodes.ResourceExists) {
          this.directoryExists = `Directory with name '${this.model.name}' already exists.`;
        }

        this.createDisabled = false;
      } else {
        this.dialogRef.close(resolver);
      }
    });
  }

  private validateInput(): boolean {
    this.noWhitespace = null;

    const invalid = /\s/;

    if (invalid.test(this.model.name)) {
      this.noWhitespace = `Invalid directory name. Whitespace in directory names are not allowed.`;

      this.createDisabled = false;

      return false;
    }

    return true;
  }
}

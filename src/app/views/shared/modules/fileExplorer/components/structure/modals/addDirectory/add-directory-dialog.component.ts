import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryRepository} from "../../../../../../../../repository/DirectoryRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";
import {ErrorCodes} from "../../../../../../../../error/ErrorCodes";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './add-directory-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class AddDirectoryDialogComponent {
  directoryExists = null;
  noWhitespace = null;

  createDisabled = false;

  constructor(
    private directoryRepository: DirectoryRepository,
    public dialogRef: MatDialogRef<AddDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }

  onModelChange() {
    this.directoryExists = null;
    this.noWhitespace = null;
  }

  createDirectory() {
    if (!this.model.name) return this.dialogRef.close();

    this.directoryExists = null;
    this.noWhitespace = null;

    this.createDisabled = true;

    if (!this.validateInput()) return;

    const httpModel = HttpModel.createDirectoryModel(
      this.model.codeProjectUuid,
      this.model.depth + 1,
      this.model.name,
      this.model.id,
      false,
    );

    this.directoryRepository.createDirectory(httpModel).then((resolver: any) => {
      if (resolver.error) {
        const errResponse = resolver.error;

        if (errResponse.errorCode === ErrorCodes.ResourceExists) {
          this.directoryExists = `Directory with name '${this.model.name}' already exists.`
        }
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

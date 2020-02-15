import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileRepository} from "../../../../../../../../repository/FileRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";
import {ErrorCodes} from "../../../../../../../../error/ErrorCodes";

@Component({
  selector: 'cms-add-file-modal',
  templateUrl: './add-file-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class AddFileDialogComponent {
  fileExists = null;
  noWhitespace = null;
  noExtension = null;
  invalidExtension = null;

  createDisabled = false;

  constructor(
    private fileRepository: FileRepository,
    public dialogRef: MatDialogRef<AddFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }

  onModelChange() {
    this.fileExists = null;
  }

  createFile() {
    if (!this.model.name) return this.dialogRef.close();

    this.createDisabled = true;
    this.fileExists = null;

    if (!this.validateInput()) return;

    const model = HttpModel.newFileModel(
      this.model.codeProjectUuid,
      this.model.name,
      this.model.directoryId,
      this.model.content,
    );

    this.fileRepository.addFileToDirectory(model).then((resolver) => {
      if (resolver.success) {
        const model = resolver.factory(this.model.codeProjectUuid, resolver.originalModel);

        this.dialogRef.close(model);
      } else if (!resolver.success) {
        const errResponse = resolver.error;

        if (errResponse.errorCode === ErrorCodes.ResourceExists) {
          this.fileExists = `File with name ${this.model.name} already exists.`;

          this.createDisabled = false;
        }
      }
    });
  }

  private validateInput(): boolean {
    this.noWhitespace = null;
    this.noExtension = null;
    this.invalidExtension = null;

    const invalid = /\s/;

    if (invalid.test(this.model.name)) {
      this.noWhitespace = `Invalid file name. Whitespace in filenames are not allowed.`;

      this.createDisabled = false;

      return false;
    }

    const manyDots = /[\.]{2,}/;

    if (manyDots.test(this.model.name)) {
      this.noExtension = `Invalid file name. No file extension has been provided. For this project, a file name must have a .${this.model.extension} extension.`;

      this.createDisabled = false;

      return false;
    }

    const split = this.model.name.split('.');

    if (split.length === 1) {
      this.noExtension = `Invalid file name. No file extension has been provided. For this project, a file name must have a .${this.model.extension} extension.`;

      this.createDisabled = false;

      return false;
    }

    if (split[split.length - 1] !== this.model.extension) {
      this.invalidExtension = `Invalid file extension. For this project, a file name must have a .${this.model.extension} extension.`;

      this.createDisabled = false;

      return false;
    }

    return true;
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileRepository} from "../../../../../../../../repository/FileRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";
import {ErrorCodes} from "../../../../../../../../error/ErrorCodes";

@Component({
  selector: 'cms-add-file-modal',
  templateUrl: './add-file-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class AddFileDialogComponent implements OnInit {
  fileExists = null;
  noWhitespace = null;
  noExtension = null;
  invalidExtension = null;
  unrecoverableError = null;

  createDisabled = false;

  validExtensions = [];

  constructor(
    private fileRepository: FileRepository,
    public dialogRef: MatDialogRef<AddFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  ngOnInit() {
    this.validExtensions = [this.model.extension];
  }

  close(): void {
    this.dialogRef.close();
  }

  onModelChange() {
    this.fileExists = null;
    this.fileExists = null;
    this.noWhitespace = null;
    this.noExtension = null;
    this.invalidExtension = null;
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
        } else {
          this.unrecoverableError = `The file could not be created. Please, refresh your browser and try again`;
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

    if (!this.validExtensions.includes(split[split.length - 1])) {
      this.invalidExtension = `Invalid file extension. For this project, a file name must have a ${this.validExtensions.join(', ')} extension.`;

      this.createDisabled = false;

      return false;
    }

    return true;
  }
}

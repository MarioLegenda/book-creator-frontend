import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileRepository} from "../../../../../../../../repository/FileRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";
import {ErrorCodes} from "../../../../../../../../error/ErrorCodes";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-file-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class EditFileDialogComponent {
  newName: string;

  fileExists = null;
  noWhitespace = null;
  noExtension = null;
  invalidExtension = null;

  createDisabled = false;

  validExtensions = [];

  constructor(
    private fileRepository: FileRepository,
    public dialogRef: MatDialogRef<EditFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  ngOnInit() {
    this.validExtensions = [this.model.extension, ...['html', 'htm', 'json']];

    this.newName = this.model.name;
  }

  close(): void {
    this.dialogRef.close();
  }

  editFile() {
    if (!this.newName) return this.dialogRef.close();

    this.createDisabled = true;
    this.fileExists = null;

    if (!this.validateInput()) return;

    const model = HttpModel.renameFileModel(
      this.model.name,
      this.model.id,
      this.model.codeProjectUuid,
      this.model.directoryId,
      this.newName,
    );

    this.fileRepository.renameFile(model).then((resolver: any) => {
      if (resolver.error) {
        const errResponse = resolver.error;

        if (errResponse.errorCode === ErrorCodes.ResourceExists) {
          this.fileExists = `File with name ${this.model.name} already exists.`;

          this.createDisabled = false;
        }
      } else {
        const model = resolver.factory(this.model.codeProjectUuid, resolver.originalModel);

        this.dialogRef.close(model);
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

    const split = this.newName.split('.');

    if (split.length === 1) {
      this.noExtension = `Invalid file name. No file extension has been provided. For this project, a file name must have a .${this.model.extension} extension.`;

      this.createDisabled = false;

      return false;
    }

    if (!this.validExtensions.includes(split[split.length - 1])) {
      this.invalidExtension = `Invalid file extension. For this project, a file name must have either ${this.validExtensions.join(', ')} extension.`;

      this.createDisabled = false;

      return false;
    }

    return true;
  }
}

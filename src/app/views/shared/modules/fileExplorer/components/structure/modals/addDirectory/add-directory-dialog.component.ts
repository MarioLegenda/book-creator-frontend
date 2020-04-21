import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileSystemRepository} from "../../../../../../../../repository/FileSystemRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";
import {ErrorCodes} from "../../../../../../../../error/ErrorCodes";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './add-directory-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class AddDirectoryDialogComponent {
  directoryExists: string = null;
  noWhitespace: string = null;
  maxDirectoryDepth: string = null;

  createDisabled: boolean = false;

  constructor(
    private fileSystemRepository: FileSystemRepository,
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
      this.model.name,
      this.model.id,
      false,
    );

    this.fileSystemRepository.createDirectory(httpModel).then((resolver: any) => {
      if (resolver.error) {
        const errResponse = resolver.error;

        if (errResponse.errorCode === ErrorCodes.ResourceExists) {
          this.directoryExists = `Directory with name '${this.model.name}' already exists.`
        } else if (errResponse.errorCode === ErrorCodes.MaxDirectoryDepth) {
          this.maxDirectoryDepth = `Max directory depth reached. You can create up to 10 nested directories.`
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

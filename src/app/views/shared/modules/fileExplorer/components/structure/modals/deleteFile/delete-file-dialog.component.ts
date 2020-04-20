import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileRepository} from "../../../../../../../../repository/FileRepository";
import {HttpModel} from "../../../../../../../../model/http/HttpModel";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './delete-file-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class DeleteFileDialogComponent {
  error: string = null;
  disabled: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DeleteFileDialogComponent>,
    private fileRepository: FileRepository,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }

  deleteFile() {
    this.error = null;

    const model = HttpModel.removeFile(
      this.model.codeProjectUuid,
      this.model.id,
    );
    this.fileRepository.removeFileById(model).subscribe(() => {
      this.dialogRef.close(true);
    }, (e) => {
      this.error = `File ${this.model.name} could not be removed. Please, refresh your browser and try again`;
      this.disabled = true;
    });
  }
}

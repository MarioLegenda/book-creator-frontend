import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileAppModel} from "../../../../../../../../model/app/codeEditor/FileAppModel";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './delete-file-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class DeleteFileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: FileAppModel) {}

  close(): void {
    this.dialogRef.close();
  }

  deleteFile() {
    this.dialogRef.close(true);
  }
}

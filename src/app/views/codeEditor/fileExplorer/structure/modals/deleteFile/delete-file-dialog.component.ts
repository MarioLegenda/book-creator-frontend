import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";
import {DirectoryAppModel} from "../../../../../../model/app/codeEditor/DirectoryAppModel";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './delete-file-modal.component.html',
  styleUrls: ['../global-dialog.component.scss']
})
export class DeleteFileDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: DirectoryAppModel) {}

  close(): void {
    this.dialogRef.close();
  }

  deleteFile() {
    this.dialogRef.close(true);
  }
}

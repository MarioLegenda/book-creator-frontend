import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryAppModel} from "../../../../../../../../model/app/codeEditor/DirectoryAppModel";

@Component({
  selector: 'cms-add-directory-modal',
  templateUrl: './delete-directory-modal.component.html',
  styleUrls: ['../../../../../../../../main/global-dialog.component.scss']
})
export class DeleteDirectoryDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: DirectoryAppModel) {}

  close(): void {
    this.dialogRef.close();
  }

  deleteDirectory() {
    this.dialogRef.close(true);
  }
}

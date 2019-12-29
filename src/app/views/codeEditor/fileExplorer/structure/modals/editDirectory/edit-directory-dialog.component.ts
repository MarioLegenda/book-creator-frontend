import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DirectoryRepository} from "../../../../../../repository/DirectoryRepository";
import {DirectoryAppModel} from "../../../../../../model/app/codeEditor/DirectoryAppModel";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-directory-modal.component.html',
  styleUrls: ['../global-dialog.component.scss']
})
export class EditDirectoryDialogComponent {
  constructor(
    private directoryRepository: DirectoryRepository,
    public dialogRef: MatDialogRef<EditDirectoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: DirectoryAppModel) {}

  close(): void {
    this.dialogRef.close();
  }

  editDirectory() {
    if (!this.model.name) return this.dialogRef.close();
  }
}

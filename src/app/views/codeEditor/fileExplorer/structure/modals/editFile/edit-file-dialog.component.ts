import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';import {FileAppModel} from "../../../../../../model/app/codeEditor/FileAppModel";
import {FileRepository} from "../../../../../../repository/FileRepository";

@Component({
  selector: 'cms-edit-directory-modal',
  templateUrl: './edit-file-modal.component.html',
  styleUrls: ['../global-dialog.component.scss']
})
export class EditFileDialogComponent {
  constructor(
    private fileRepository: FileRepository,
    public dialogRef: MatDialogRef<EditFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: FileAppModel) {}

  close(): void {
    this.dialogRef.close();
  }

  editFile() {
    if (!this.model.name) return this.dialogRef.close();
  }
}

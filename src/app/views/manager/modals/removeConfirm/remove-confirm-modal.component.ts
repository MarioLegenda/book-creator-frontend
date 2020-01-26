import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FileAppModel} from "../../../../model/app/codeEditor/FileAppModel";

@Component({
  selector: 'cms-remove-confirm-modal',
  templateUrl: './remove-confirm-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './remove-confirm-modal.component.scss'
  ]
})
export class RemoveConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RemoveConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: {}) {}

  close(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.dialogRef.close(true);
  }
}

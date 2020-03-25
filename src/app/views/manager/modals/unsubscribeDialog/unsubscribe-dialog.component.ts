import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-unsubscribe-dialog',
  templateUrl: './unsubscribe-dialog.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './unsubscribe-dialog.component.scss'
  ]
})
export class UnsubscribeDialog {
  constructor(
    public dialogRef: MatDialogRef<UnsubscribeDialog>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close(false);
  }

  confirmUnsubscribe() {
    this.dialogRef.close(true);
  }
}

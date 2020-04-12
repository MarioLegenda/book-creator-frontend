import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-notify-if-published-dialog',
  templateUrl: './notify-if-published-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './notify-if-published-modal.component.scss'
  ]
})
export class NotifyIfPublishedModal {
  constructor(
    public dialogRef: MatDialogRef<NotifyIfPublishedModal>,
    @Inject(MAT_DIALOG_DATA) public model: any) {
  }

  close(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}

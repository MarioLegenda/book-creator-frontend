import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-main-header-help-modal',
  templateUrl: './main-header-help-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    '../../../shared/styles/helpContent.scss',
  ]
})
export class MainHeaderHelpModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MainHeaderHelpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }
}

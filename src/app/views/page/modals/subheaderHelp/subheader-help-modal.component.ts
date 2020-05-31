import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-subheader-help-modal',
  templateUrl: './subheader-help-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    '../../../shared/styles/helpContent.scss',
  ]
})
export class SubheaderHelpModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SubheaderHelpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }
}

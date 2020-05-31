import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-quote-help-modal',
  templateUrl: './quote-help-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    '../../../shared/styles/helpContent.scss',
  ]
})
export class QuoteHelpModalComponent {
  constructor(
    public dialogRef: MatDialogRef<QuoteHelpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }
}

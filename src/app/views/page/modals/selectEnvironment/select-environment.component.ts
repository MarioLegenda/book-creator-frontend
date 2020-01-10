import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-select-environment-modal',
  templateUrl: './select-environment.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './select-environment.component.scss'
  ]
})
export class SelectEnvironmentDialog {
  constructor(
    public dialogRef: MatDialogRef<SelectEnvironmentDialog>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }

  onSelect(eml: any) {
    if (eml.inDevelopment || eml.inMaintenance) return;

    this.dialogRef.close(eml);
  }
}

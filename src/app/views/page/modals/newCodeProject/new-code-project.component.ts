import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-new-code-project-modal',
  templateUrl: './new-code-project.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './new-code-project.component.scss',
  ]
})
export class NewCodeProjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NewCodeProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  onCreate() {
    this.dialogRef.close(this.model);
  }
}

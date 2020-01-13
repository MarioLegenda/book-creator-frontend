import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-import-code-project-modal',
  templateUrl: './import-code-project.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './import-code-project.component.scss',
  ]
})
export class ImportCodeProjectDialogComponent {
  projects = [];


  constructor(
    public dialogRef: MatDialogRef<ImportCodeProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  onCreateNew() {
    this.dialogRef.close('newCodeProject');
  }
}

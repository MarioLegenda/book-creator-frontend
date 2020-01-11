import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-link-code-project-modal',
  templateUrl: './link-code-project.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './link-code-project.component.scss'
  ]
})
export class LinkCodeProjectDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<LinkCodeProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  onSelect(): void {

  }
}

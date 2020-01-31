import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-add-internal-name-modal',
  templateUrl: './add-internal-name-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './add-internal-name-modal.component.scss'
  ]
})
export class AddInternalNameModalComponent {
  errors: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddInternalNameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close(null);
  }

  addInternalName() {
    this.dialogRef.close(this.model.name);
  }
}

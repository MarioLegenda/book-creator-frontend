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
  name = this.model.name;

  constructor(
    public dialogRef: MatDialogRef<AddInternalNameModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  ngOnInit() {
    this.name = this.model.name;
  }

  close(): void {
    this.dialogRef.close('closed');
  }

  addInternalName() {
    if (!this.name) {
      return this.dialogRef.close('');
    }

    return this.dialogRef.close(this.name);
  }
}

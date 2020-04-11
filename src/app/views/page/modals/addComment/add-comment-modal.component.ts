import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './add-comment-modal.component.scss'
  ]
})
export class AddCommentModalComponent {
  errors: string[] = [];
  name: string = this.model.name;

  constructor(
    public dialogRef: MatDialogRef<AddCommentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close('closed');
  }

  addComment() {
    if (!this.name) {
      return this.dialogRef.close('');
    }

    return this.dialogRef.close(this.name);
  }
}

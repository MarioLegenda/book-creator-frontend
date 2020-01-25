import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-embed-unsplash-modal',
  templateUrl: './embed-unsplash-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './embed-unsplash-modal.component.scss'
  ]
})
export class EmbedUnsplashDialogComponent {
  errors: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<EmbedUnsplashDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  addLink() {
    if (!this.model.name) return;

    this.dialogRef.close(this.getId());
  }

  private getId(): string {
    const splitted = this.model.name.split('/');

    return splitted[4];
  }
}

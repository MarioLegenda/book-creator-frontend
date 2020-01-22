import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-add-youtube-link-modal',
  templateUrl: './embed-youtube-link.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './embed-youtube-link.component.scss'
  ]
})
export class AddYoutubeLinkDialogComponent {
  errors: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddYoutubeLinkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  addLink() {
    const url = new URL(this.model.name);

    this.dialogRef.close(this.extractId(url));
  }

  private isUrl(url): boolean {
    return !!(url.search);
  }

  private isShareableLink(url): boolean {
    return !(url.search);
  }

  private extractId(url): string {
    if (this.isUrl(url)) {
      return url.search.split('=')[1]
    } else if (this.isShareableLink(url)) {
      return url.pathname.substring(1);
    }
  }
}

import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-add-github-gist-modal',
  templateUrl: './add-github-gist-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './add-github-gist-modal.component.scss'
  ]
})
export class AddGithubGistDialogComponent {
  errors: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddGithubGistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  addLink() {
    if (!this.model.name) return;

    this.validateHost();
    this.validateLink();

    if (this.errors.length !== 0) {
      return;
    }

    const model = this.createModel();

    this.dialogRef.close(model);
  }

  private validateLink() {
    const link = this.model.name;

    const splitted = link.split('/');

    if (splitted.length < 5) {
      this.errors.push('Invalid url given. Cannot determine username and gist id');
    }
  }

  private validateHost() {
    const hostRgx = RegExp('^https://gist.github.com*', 'i');

    if (!hostRgx.test(this.model.name)) {
      this.errors.push('Invalid domain. The domain must be https://gist.github.com');
    }
  }

  private createModel() {
    const splitted = this.model.name.split('/');

    return {
      username: splitted[3],
      gistId: splitted[4],
    }
  }
}

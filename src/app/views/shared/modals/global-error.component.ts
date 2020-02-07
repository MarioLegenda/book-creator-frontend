import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-add-comment-modal',
  templateUrl: './global-error.component.html',
  styleUrls: [
    '../../../main/global-dialog.component.scss',
    './global-error.component.scss'
  ]
})
export class GlobalErrorComponentModal {
  errors: string[] = [];

  counter = 15;

  constructor(
    public dialogRef: MatDialogRef<GlobalErrorComponentModal>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {
    if (model.runCounter) this.runCounter();
  }

  onRefresh() {
    location.href = location.pathname;
  }

  private runCounter() {
    const interval = setInterval(() => {
      this.counter = this.counter - 1;

      if (this.counter === 0) {
        clearInterval(interval);
        // @ts-ignore
        location.href = location.pathname;
      }
    }, 1000);
  }
}

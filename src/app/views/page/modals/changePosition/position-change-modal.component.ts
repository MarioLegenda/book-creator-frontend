import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-position-change-modal',
  templateUrl: './position-change-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './position-change-modal.component.scss'
  ]
})
export class PositionChangeModalComponent {
  errors: string[] = [];
  selectedPosition: number = null;

  constructor(
    public dialogRef: MatDialogRef<PositionChangeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any)
  {}

  close(): void {
    this.dialogRef.close();
  }

  changePosition(): void {
    // @ts-ignore
    const position: number = parseInt(this.selectedPosition);
    const maxPosition: number = parseInt(this.model.maxPosition);
    const currentPosition: number = parseInt(this.model.currentPosition);

    this.errors = [];

    if (position > maxPosition) {
      this.errors.push(`Invalid position. Position must be a number from 1 to ${this.model.maxPosition} (current max position) and it cannot be the current position (${this.model.currentPosition})`);

      return;
    }

    if (position === currentPosition) {
      this.errors.push(`Invalid position. Position must be a number from 1 to ${this.model.maxPosition} (current max position) and it cannot be the current position (${this.model.currentPosition})`);

      return;
    }

    this.dialogRef.close({
      position: this.selectedPosition,
    });
  }

  isValidPosition(): boolean {
    if (!this.selectedPosition) return false;
    // @ts-ignore
    const position: number = parseInt(this.selectedPosition);

    if (position === 0) return false;

    return true;
  }
}

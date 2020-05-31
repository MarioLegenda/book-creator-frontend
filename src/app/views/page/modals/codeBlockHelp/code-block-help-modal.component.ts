import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Router} from "@angular/router";

@Component({
  selector: 'cms-code-block-help-modal',
  templateUrl: './code-block-help-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    '../../../shared/styles/helpContent.scss',
  ]
})
export class CodeBlockHelpModalComponent {
  constructor(
    public dialogRef: MatDialogRef<CodeBlockHelpModalComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  close(): void {
    this.dialogRef.close();
  }

  onDashboard(): void {
    this.router.navigate(["cms", "management", "code-projects", "list"]);

    this.dialogRef.close();
  }
}

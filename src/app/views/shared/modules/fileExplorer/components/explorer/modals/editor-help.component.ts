import {Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'cms-editor-help',
  templateUrl: './editor-help.component.html',
  styleUrls: [
    '../../../../../../../main/global-dialog.component.scss',
    '../../../../../../shared/styles/helpContent.scss',
    './editor-help.component.scss'
  ]
})
export class EditorHelpModalComponent {
  @ViewChild('overview') overview: TemplateRef<any>;
  @ViewChild('directoriesAndFiles') directoriesAndFiles: TemplateRef<any>;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EditorHelpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {
  }

  close(): void {
    this.dialogRef.close();
  }

  onNavigation(type: string) {
    this[type].nativeElement.scrollIntoView();
  }
}

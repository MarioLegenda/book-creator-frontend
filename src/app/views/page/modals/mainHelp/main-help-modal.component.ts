import {Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cms-remove-confirm-modal',
  templateUrl: './main-help-modal.component.html',
  styleUrls: [
    '../../../../main/global-dialog.component.scss',
    './main-help-modal.component.scss'
  ]
})
export class MainHelpModalComponent {
  constructor(
    public dialogRef: MatDialogRef<MainHelpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public model: any) {}

  @ViewChild('overview') overview: TemplateRef<any>;
  @ViewChild('tdc') tdc: TemplateRef<any>;
  @ViewChild('mainHeader') mainHeader: TemplateRef<any>;
  @ViewChild('subheader') subheader: TemplateRef<any>;
  @ViewChild('paragraph') paragraph: TemplateRef<any>;
  @ViewChild('multimediaBlock') multimediaBlock: TemplateRef<any>;
  @ViewChild('embedUnsplash') embedUnsplash: TemplateRef<any>;
  @ViewChild('uploadLocalImage') uploadLocalImage: TemplateRef<any>;
  @ViewChild('embedYoutube') embedYoutube: TemplateRef<any>;
  @ViewChild('codeBlock') codeBlock: TemplateRef<any>;
  @ViewChild('selectEnvironment') selectEnvironment: TemplateRef<any>;
  @ViewChild('embedGithubGist') embedGithubGist: TemplateRef<any>;
  @ViewChild('readonly') readonly: TemplateRef<any>;
  @ViewChild('runCode') runCode: TemplateRef<any>;
  @ViewChild('runCodeProject') runCodeProject: TemplateRef<any>;
  @ViewChild('quoteBlock') quoteBlock: TemplateRef<any>;
  @ViewChild('rearrangingBlocks') rearrangingBlocks: TemplateRef<any>;

  close(): void {
    this.dialogRef.close();
  }

  onNavigation(type: string) {
    this[type].nativeElement.scrollIntoView();
  }
}

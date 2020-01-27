import {Component, Input} from '@angular/core';

@Component({
  selector: 'cms-block-info',
  styleUrls: [
    './info.component.scss',
    './../global-block.component.scss',
  ],
  templateUrl: './info.component.html',
})
export class InfoComponent {
  @Input('readOnly') readOnly: boolean;
  @Input('isGist') isGist: boolean;
  @Input('isCode') isCode: boolean;
  @Input('emulator') emulator: any;
  @Input('codeProject') codeProject: any;

  componentState = {
    showInfo: false,
  };

  toggleInfo() {
    this.componentState.showInfo = !this.componentState.showInfo;
  }
}

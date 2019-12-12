import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileTab} from "../../../../../model/app/codeEditor/FileTab";

@Component({
  selector: 'cms-file-tab',
  styleUrls: [
    './tab.component.scss',
  ],
  templateUrl: './tab.component.html',
})
export class TabComponent {
  @Input('fileTab') fileTab: FileTab;
  @Output('tabCloseEvent') tabCloseEvent = new EventEmitter();

  close() {
    this.tabCloseEvent.emit(this.fileTab);
  }
}

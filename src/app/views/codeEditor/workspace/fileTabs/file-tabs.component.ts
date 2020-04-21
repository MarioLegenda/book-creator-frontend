import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FileTab} from "../../../../model/app/codeEditor/FileTab";

@Component({
  selector: 'cms-file-tabs',
  styleUrls: [
    './file-tabs.component.scss',
  ],
  templateUrl: './file-tabs.component.html',
})
export class FileTabsComponent {
  @Input('tabs') tabs = {};
  @Input('selectedTab') selectedTab: FileTab;

  @Output('tabCloseEvent') tabCloseEvent = new EventEmitter();
  @Output('tabSelectEvent') tabSelectEvent = new EventEmitter();

  onTabClose(tab: FileTab) {
    this.tabCloseEvent.emit(tab);
  }

  onTabSelect(tab: FileTab) {
    this.tabSelectEvent.emit(tab);
  }
}

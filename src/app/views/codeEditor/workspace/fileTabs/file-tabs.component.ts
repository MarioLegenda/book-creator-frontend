import {Component, EventEmitter, Input, Output} from '@angular/core';
import {select, Store} from "@ngrx/store";
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
  @Output('tabCloseEvent') tabCloseEvent = new EventEmitter();

  onTabClose(tab: FileTab) {
    this.tabCloseEvent.emit(tab);
  }
}

import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
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
  @Input('selectedTab') selectedTab: FileTab;
  @ViewChild('tooltip', {static: true}) tooltip;

  @Output('tabCloseEvent') tabCloseEvent = new EventEmitter();
  @Output('tabSelectEvent') tabSelectEvent = new EventEmitter();

  private selected = null;

  onClose() {
    this.tabCloseEvent.emit(this.fileTab);
  }

  onSelected($event) {
    $event.stopPropagation();
    $event.preventDefault();

    this.selected = true;

    this.tabSelectEvent.emit(this.fileTab);
  }
}

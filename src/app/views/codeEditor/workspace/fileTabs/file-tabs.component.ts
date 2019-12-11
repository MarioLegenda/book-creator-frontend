import {Component} from '@angular/core';
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
  tabs = {};

  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {
        if (!Object.hasOwnProperty(action.id)) {
          this.tabs[action.id] = new FileTab(action.id, action.name);
        }
      }
    });
  }
}

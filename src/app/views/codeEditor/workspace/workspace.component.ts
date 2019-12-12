import {Component} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {FileTab} from "../../../model/app/codeEditor/FileTab";
import Util from "../../../library/Util";
import {TabSession} from "../../../store/sessions/TabSession";
import {actionTypes} from "../../../store/editor/httpActions";

@Component({
  selector: 'cms-editor-workspace',
  styleUrls: [
    './workspace.component.scss',
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  tabs = [];
  hasTabs = false;

  private indexMap = {};

  constructor(
    private store: Store<any>,
    private tabSession: TabSession,
  ) {}

  ngOnInit() {
    this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {
        if (!Util.hasKey(this.tabs, action.id)) {
          this.tabs.push(new FileTab(action.id, action.name));
          this.indexMap[action.id] = this.findTabIndex(action.id);
        }
      }

      this.updateHasTabs();
    });

    this.store.pipe(select('editorHttpActions')).subscribe((action: any) => {
      if (action) {
        if (action.type === actionTypes.EDITOR_HTTP_REMOVE_FILE_FINISHED) {
          this.onTabClose(action);
        }
      }
    });
  }

  onTabClose(tab: FileTab) {
    if (Util.hasKey(this.indexMap, tab.id)) {
      delete this.indexMap[tab.id];
      this.tabs.splice(this.findTabIndex(tab.id), 1);

      this.tabSession.remove(tab.id);
    }

    this.updateHasTabs();
  }

  private updateHasTabs(): void {
    const keyNum: number = this.tabs.length;

    if (keyNum > 0) {
      this.hasTabs = true;
    } else if (keyNum <= 0) {
      this.hasTabs = false;
    }
  }

  private findTabIndex(fileId) {
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].id === fileId) {
        return i;
      }
    }

    return null;
  }
}

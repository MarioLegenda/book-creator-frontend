import {AfterViewInit, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {FileTab} from "../../../model/app/codeEditor/FileTab";
import Util from "../../../library/Util";
import {TabSession} from "../../../store/sessions/TabSession";
import {actionTypes as httpActionTypes} from "../../../store/editor/httpActions";
import {actionTypes as viewActionTypes} from "../../../store/editor/viewActions";
import {FileRepository} from "../../../repository/FileRepository";
import {ReplaySubject} from "rxjs";

@Component({
  selector: 'cms-editor-workspace',
  styleUrls: [
    './workspace.component.scss',
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnDestroy {
  tabs = [];
  hasTabs = false;

  selectedTab: FileTab = null;
  contentLoadedEvent = new ReplaySubject();

  private indexMap = {};

  constructor(
    private store: Store<any>,
    private tabSession: TabSession,
    private fileRepository: FileRepository,
  ) {}

  ngOnInit() {
    this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {

        switch (action.type) {
          case viewActionTypes.VIEW_EDITOR_SHOW_FILE: {
            if (!Util.hasKey(this.tabs, action.id)) {
              const tab: FileTab = new FileTab(action.id, action.name);
              this.tabs.unshift(tab);
              this.indexMap[action.id] = this.findTabIndex(action.id);

              this.onTabSelect(tab);
            }

            break;
          }
        }
      }

      this.updateHasTabs();
    });

    this.store.pipe(select('editorHttpActions')).subscribe((action: any) => {
      if (action) {
        if (action.type === httpActionTypes.EDITOR_HTTP_REMOVE_FILE_FINISHED) {
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

  onTabSelect(tab: FileTab) {
    this.selectedTab = tab;

    this.fileRepository.getFileContent(tab.id).subscribe((body: any) => {
      this.contentLoadedEvent.next(body.data.content);
    });
  }

  ngOnDestroy(): void {
    this.contentLoadedEvent.unsubscribe();
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

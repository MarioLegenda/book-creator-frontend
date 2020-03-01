import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {FileTab} from "../../../model/app/codeEditor/FileTab";
import Util from "../../../library/Util";
import {actionTypes as httpActionTypes} from "../../../store/editor/httpActions";
import {actionTypes as viewActionTypes} from "../../../store/editor/viewActions";
import {FileRepository} from "../../../repository/FileRepository";
import {Subject} from "rxjs";
import {TabSession} from "../../../store/sessions/TabSession";
import {Environments} from "../../../library/Environments";

@Component({
  selector: 'cms-editor-workspace',
  styleUrls: [
    './workspace.component.scss',
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent implements OnDestroy, OnInit {
  tabs = [];
  hasTabs = false;
  selectedTab: FileTab = null;

  contentLoadedEvent = new Subject();

  @Input('project') project: any;
  @Input('environments') environments: Environments;

  private editorViewActionsUns;
  private editorHttpActionsUns;
  private indexMap = {};

  constructor(
    private store: Store<any>,
    private fileRepository: FileRepository,
    private tabSession: TabSession,
  ) {}

  ngOnInit() {
    this.editorViewActionsUns = this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {
        switch (action.type) {
          case viewActionTypes.VIEW_EDITOR_SHOW_FILE: {
            if (!Util.hasKey(this.indexMap, action.id)) {
              const tab: FileTab = new FileTab(action.id, action.name);
              this.tabs.unshift(tab);
              this.indexMap[action.id] = this.findTabIndex(action.id);

              this.onTabSelect(tab);
            } else {
              this.onExistingTabSelect(action.id);
            }

            break;
          }
        }
      }

      this.updateHasTabs();
    });

    this.editorHttpActionsUns = this.store.pipe(select('editorHttpActions')).subscribe((action: any) => {
      if (action) {
        if (action.type === httpActionTypes.EDITOR_HTTP_REMOVE_FILE_FINISHED) {
          this.onTabClose(action);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.tabSession.clear();

    this.editorViewActionsUns.unsubscribe();
    this.editorHttpActionsUns.unsubscribe();
  }

  onTabClose(tab: FileTab) {
    if (Util.hasKey(this.indexMap, tab.id)) {
      delete this.indexMap[tab.id];
      this.tabs.splice(this.findTabIndex(tab.id), 1);
    }

    if (this.tabSession.has(tab.id)) {
      this.tabSession.remove(tab.id);
      this.tabSession.clearSelected();
    }

    this.updateHasTabs();

    if (this.hasTabs) {
      this.onExistingTabSelect(this.tabs[0].id);
    }
  }

  onTabSelect(tab: FileTab) {
    this.tabSession.add(tab.id);
    this.tabSession.setSelected(tab.id);
    this.loadFileContent(tab.id);
  }

  onExistingTabSelect(tabId: string) {
    if (Util.hasKey(this.indexMap, tabId)) {
      this.loadFileContent(tabId);
    }
  }

  private updateHasTabs(): void {
    const keyNum: number = this.tabs.length;

    if (keyNum > 0) {
      this.hasTabs = true;
    } else if (keyNum <= 0) {
      this.hasTabs = false;
      this.selectedTab = null;
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

  private loadFileContent(tabId: string) {
    this.fileRepository.getFileContent(this.project.uuid, tabId).subscribe((body: any) => {
      this.contentLoadedEvent.next(body.data.content);

      const idx = this.findTabIndex(tabId);

      this.selectedTab = this.tabs[idx];

      this.tabs = [].concat(this.tabs);
    });
  }
}

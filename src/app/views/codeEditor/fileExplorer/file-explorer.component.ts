import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CodeProjectHttpModel} from "../../../model/http/codeEditor/CodeProjectHttpModel";
import Util from "../../../library/Util";

@Component({
  selector: 'cms-file-explorer',
  styleUrls: [
    './file-explorer.component.scss',
  ],
  templateUrl: './file-explorer.component.html',
})
export class FileExplorerComponent implements AfterViewInit {
  @Input('project') project: CodeProjectHttpModel;

  // @ts-ignore
  @ViewChild('wrapperRef') wrapperRef: ElementRef;
  // @ts-ignore
  @ViewChild('actionWrapperRef') actionWrapperRef: ElementRef;

  componentState = {
    selectedAction: 'project',
    selectedActionClass: {},
    icons: {
      selectProject: {'fas fa-clone': true},
      searchProject: {'fas fa-search': true},
    },
  };

  ngAfterViewInit(): void {
    Util.setHeightFromWrapper(document.body, this.wrapperRef.nativeElement);
    Util.setHeightFromWrapper(document.body, this.actionWrapperRef.nativeElement);
  }

  selectAction(action) {
    this.componentState.selectedAction = action;
  }
}

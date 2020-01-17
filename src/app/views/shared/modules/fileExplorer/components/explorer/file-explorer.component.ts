import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {CodeProjectHttpModel} from "../../../../../../model/http/codeEditor/CodeProjectHttpModel";
import Util from "../../../../../../library/Util";

@Component({
  selector: 'cms-file-explorer',
  styleUrls: [
    './file-explorer.component.scss',
  ],
  templateUrl: './file-explorer.component.html',
})
export class FileExplorerComponent implements AfterViewInit {
  @Input('project') project: CodeProjectHttpModel;
  @Input('showEditorActions') showEditorActions: boolean = true;

  @Input('enableAddDirectory') enableAddDirectory: boolean = true;
  @Input('enableAddFile') enableAddFile: boolean = true;
  @Input('enableRemoveDirectory') enableRemoveDirectory: boolean = true;
  @Input('enableRemoveFile') enableRemoveFile: boolean = true;
  @Input('enableEditFile') enableEditFile: boolean = true;
  @Input('enableEditDirectory') enableEditDirectory: boolean = true;

  // @ts-ignore
  @ViewChild('wrapperRef') wrapperRef: ElementRef;
  // @ts-ignore
  @ViewChild('actionWrapperRef') actionWrapperRef: ElementRef;

  componentState = {
    selectedAction: 'project',
    selectedActionClass: {},
  };

  ngAfterViewInit(): void {
    Util.setHeightFromWrapper(document.body, this.wrapperRef.nativeElement);

    if (this.actionWrapperRef) {
      Util.setHeightFromWrapper(document.body, this.actionWrapperRef.nativeElement);
    }
  }

  selectAction(action) {
    this.componentState.selectedAction = action;
  }
}

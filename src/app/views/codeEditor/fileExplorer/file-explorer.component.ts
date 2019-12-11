import {Component, Input} from '@angular/core';
import {CodeProjectHttpModel} from "../../../model/http/codeEditor/CodeProjectHttpModel";

@Component({
  selector: 'cms-file-explorer',
  styleUrls: [
    './file-explorer.component.scss',
  ],
  templateUrl: './file-explorer.component.html',
})
export class FileExplorerComponent {
  @Input('project') project: CodeProjectHttpModel;

  componentState = {
    selectedAction: 'project',
    selectedActionClass: {},
    icons: {
      selectProject: {'fas fa-clone': true},
      searchProject: {'fas fa-search': true},
    },
  };

  selectAction(action) {
    this.componentState.selectedAction = action;
  }
}

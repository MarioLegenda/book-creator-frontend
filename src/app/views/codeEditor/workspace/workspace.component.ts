import {Component} from '@angular/core';

@Component({
  selector: 'cms-editor-workspace',
  styleUrls: [
    './workspace.component.scss',
  ],
  templateUrl: './workspace.component.html',
})
export class WorkspaceComponent {
  componentState = {
    editorOptions: {
      theme: 'vs-light',
      language: 'javascript',
      codeLens: false,
      formatOnPaste: true,
      minimap: {
        enabled: false,
      }
    },
    code: '',
  };
}

import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'cms-playground-working-area',
  styleUrls: [
    './working-area.component.scss',
  ],
  templateUrl: './working-area.component.html',
})
export class WorkingAreaComponent {
  @Output('runProjectEvent') runProjectEvent = new EventEmitter();

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

  onRunProject() {
    this.runProjectEvent.emit({
      code: this.componentState.code,
    });
  }
}

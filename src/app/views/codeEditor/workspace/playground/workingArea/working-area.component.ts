import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'cms-playground-working-area',
  styleUrls: [
    './working-area.component.scss',
  ],
  templateUrl: './working-area.component.html',
})
export class WorkingAreaComponent {
  @Output('runProjectEvent') runProjectEvent = new EventEmitter();

  @Input('isRunning') isRunning: boolean = false;

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
    if (!this.componentState.code) return;
    
    this.runProjectEvent.emit({
      code: this.componentState.code,
    });
  }
}

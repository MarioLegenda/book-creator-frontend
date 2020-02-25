import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cms-playground-working-area',
  styleUrls: [
    './working-area.component.scss',
  ],
  templateUrl: './working-area.component.html',
})
export class WorkingAreaComponent implements OnInit {
  @Output('runProjectEvent') runProjectEvent = new EventEmitter();

  @Input('project') project: any;
  @Input('isRunning') isRunning: boolean = false;

  componentState = {
    editorOptions: null,
    code: '',
  };

  ngOnInit() {
    const editorOptions = {
      theme: 'vs-light',
      language: this.project.environment.language,
      codeLens: false,
      formatOnPaste: true,
      minimap: {
        enabled: false,
      }
    };

    this.componentState.editorOptions = editorOptions;
  }

  onRunProject() {
    if (!this.componentState.code) return;

    this.runProjectEvent.emit({
      code: this.componentState.code,
    });
  }
}

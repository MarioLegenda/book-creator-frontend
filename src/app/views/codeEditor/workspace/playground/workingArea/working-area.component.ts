import {Component, EventEmitter, Output, Input, OnInit} from '@angular/core';
import {Environments} from "../../../../../library/Environments";

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
  @Input('environments') environments: Environments;
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

    if (this.project.environment.name === "go_v1_13_5") {
      this.componentState.code = "package main";
    }

    this.componentState.editorOptions = editorOptions;
  }

  isRunDisabled(): boolean {
    if (this.isRunning) return true;

    if (this.environments.isGoLang(this.project.environment.name)) {
      return false;
    }

    if (!this.componentState.code) {
      return true;
    }

    return false;
  }

  isCompiledLanguage(): boolean {
    return this.project.environment.name === "go_v1_13_5" || this.project.environment.name === "rust"
  }

  onRunProject() {
    if (this.project.environment.name !== "go_v1_13_5" && this.project.environment.name !== "rust") {
      if (!this.componentState.code) return;
    }

    this.runProjectEvent.emit({
      code: this.componentState.code,
    });
  }
}

import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {MatDialog} from "@angular/material/dialog";
import {IComponent} from "../../../../logic/PageComponent/IComponent";

@Component({
  selector: 'cms-code-block',
  styleUrls: ['./code-block.component.scss'],
  templateUrl: './code-block.component.html',
})
export class CodeBlockComponent {
  constructor() {}

  componentState = {
    hovered: false,
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

  @Input('index') index: number;
  @Input('componentData') componentData: IComponent;

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  ngOnInit() {
  }
}

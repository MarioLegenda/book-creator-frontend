import {Component, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock} from "../../../../store/page/httpActions";
import {CodeBlockModel} from "../../../../model/app/CodeBlockModel";

@Component({
  selector: 'cms-code-block',
  styleUrls: ['./code-block.component.scss'],
  templateUrl: './code-block.component.html',
})
export class CodeBlockComponent {

  constructor(
    private store: Store<any>
  ) {}

  icons = {
    'remove': 'fas fa-trash-alt',
  };

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
  @Input('component') component: CodeBlockModel;

  componentHovered() {
    this.componentState.hovered = true;
  }

  componentUnHovered() {
    this.componentState.hovered = false;
  }

  remove() {
    this.store.dispatch(httpRemoveTextBlock(this.component));
  }

  ngOnInit() {
    this.componentState.code = this.component.text;
  }
}

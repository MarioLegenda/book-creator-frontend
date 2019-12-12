import {Component, Input} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {TabSession} from "../../../../store/sessions/TabSession";

@Component({
  selector: 'cms-text-editor',
  styleUrls: [
    './text-editor.component.scss',
  ],
  templateUrl: './text-editor.component.html',
})
export class TextEditorComponent {
  @Input('hasTabs') hasTabs: boolean;

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

  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.store.pipe(select('editorViewActions')).subscribe((action: any) => {
      if (action) {
        this.componentState.code = action.content;
      }
    });
  }
}

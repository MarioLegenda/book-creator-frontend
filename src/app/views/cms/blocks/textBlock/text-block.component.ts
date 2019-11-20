import {Component, Input, ViewChild} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock, httpUpdateTextBlock} from "../../../../store/httpActions";
import {CKEditorComponent} from "@ckeditor/ckeditor5-angular";

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['../../../../web/styles/blocks/text-block.component.scss'],
  templateUrl: '../../../../web/templates/cms/blocks/text-block.component.html',
})
export class TextBlockComponent {
  componentState = {
    focused: false,
    updateWanted: false
  };

  editorCreated = false;

  editor = BalloonEditor;

  // @ts-ignore
  @ViewChild('editorComponent') editorComponent: CKEditorComponent;
  @Input() componentData: IComponent;

  constructor(
    private store: Store<any>,
  ) {}

  createEditor() {
    this.editorCreated = true;
  }

  onEditorReady($event: any) {
    $event.editing.view.focus();

    this.editorComponent.editorInstance.setData(this.componentData.value.text);
  }

  onEditorBlur() {
    const model: any = {};
    model.blockUuid = this.componentData.value.blockUuid;
    model.text = this.componentData.value.text;

    this.editorComponent.editorInstance.setData(this.componentData.value.text);

    this.store.dispatch(httpUpdateTextBlock(model));
  }

  remove() {
    this.store.dispatch(httpRemoveTextBlock(this.componentData));
  }

  focusComponent() {
    this.componentState.focused = true;
  }

  unFocusComponent() {
    this.componentState.focused = false;
  }
}

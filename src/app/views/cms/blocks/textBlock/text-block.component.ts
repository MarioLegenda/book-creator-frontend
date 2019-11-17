import {Component, Input} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {Store} from "@ngrx/store";
import {viewTextBlockRemoved} from "../../../../store/viewActions";

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
  @Input() componentData: IComponent;

  constructor(
    private store: Store<any>,
  ) {}

  createEditor() {
    this.editorCreated = true;
  }

  onEditorReady($event: any) {
    $event.editing.view.focus();
  }

  remove() {
    this.store.dispatch(viewTextBlockRemoved(this.componentData));
  }

  onMouseEnter() {
    this.componentState.focused = true;
  }

  onMouseLeave() {
    this.componentState.focused = false;
  }
}

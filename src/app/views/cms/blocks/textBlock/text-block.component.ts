import {Component, Input} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {Store} from "@ngrx/store";
import {httpRemoveTextBlock} from "../../../../store/httpActions";

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

  ngOnInit() {
    console.log(this.componentData);
  }

  createEditor() {
    this.editorCreated = true;
  }

  onEditorReady($event: any) {
    $event.editing.view.focus();
  }

  remove() {
    this.store.dispatch(httpRemoveTextBlock(this.componentData));
  }

  onMouseEnter() {
    this.componentState.focused = true;
  }

  onMouseLeave() {
    this.componentState.focused = false;
  }
}

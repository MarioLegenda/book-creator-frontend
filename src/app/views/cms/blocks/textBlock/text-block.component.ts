import {Component, Input} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";

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

  Editor = BalloonEditor;
  @Input() componentData: IComponent;

  constructor(
    private store: Store<any>,
  ) {}

  onUpdateWanted() {
    this.componentState.updateWanted = !this.componentState.updateWanted;
  }

  onTextBlur() {
  }

  remove() {
  }

  onMouseEnter() {
    this.componentState.focused = true;
  }

  onMouseLeave() {
    this.componentState.focused = false;
  }
}

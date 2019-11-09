import {Component, Input} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../../logic/pageComponent/IComponent";

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['../../../../../web/styles/blocks/textBlock/text-block-view.component.scss'],
  templateUrl: '../../../../../web/templates/blocks/textBlock/view/text-block.component.html',
})
export class TextBlockComponent {
  componentState = {
    focused: false
  };

  Editor = BalloonEditor;
  @Input() componentData: IComponent;
}

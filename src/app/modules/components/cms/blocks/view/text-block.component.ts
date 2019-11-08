import {Component, Input, OnInit} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../../services/tracking/IComponent";

@Component({
  selector: 'cms-view-text-block',
  styleUrls: ['../../scss/blocks/text-block-view.component.scss'],
  templateUrl: '../../html/blocks/view/text-block.component.html',
})
export class TextBlockComponent {
  Editor = BalloonEditor;
  @Input() componentData: IComponent;
}

import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";

@Component({
  selector: 'cms-metadata-placeholder',
  styleUrls: ['../../../../web/styles/blocks/metadata-placeholder.components.scss'],
  templateUrl: '../../../../web/templates/cms/blocks/textBlock/metadata-placeholder.component.html',
})
export class MetadataPlaceholderComponent implements OnInit{
  @Input('type') type: string;
  focused: boolean = false;

  text = 'Click to change...';

  ngOnInit() {
    if (this.type === 'internal-name') {
      this.text = 'Click to add internal name...';
    } else if (this.type === 'short-description') {
      this.text = 'Click to add description...';
    }
  }

  onHover() {
    this.focused = !this.focused;
  }
}

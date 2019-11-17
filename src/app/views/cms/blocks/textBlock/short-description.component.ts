import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";

@Component({
  selector: 'cms-short-description',
  styleUrls: [
    '../../../../web/styles/blocks/short-description.component.scss',
    '../../../../web/styles/blocks/metadata-action.component.scss',
  ],
  templateUrl: '../../../../web/templates/cms/blocks/textBlock/short-description.component.html',
})
export class ShortDescriptionComponent {
  toggleInputField: boolean;

  showInputField() {
    this.toggleInputField = true;
  }

  hideInputField() {
    this.toggleInputField = false;
  }
}

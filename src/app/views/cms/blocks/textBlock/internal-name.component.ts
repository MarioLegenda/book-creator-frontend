import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {IComponent} from "../../../../logic/PageComponent/IComponent";
import {FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";

@Component({
  selector: 'cms-internal-name',
  styleUrls: [
    '../../../../web/styles/blocks/internal-name.component.scss',
    '../../../../web/styles/blocks/metadata-action.component.scss',
  ],
  templateUrl: '../../../../web/templates/cms/blocks/textBlock/internal-name.component.html',
})
export class InternalNameComponent {
  toggleInputField: boolean;

  showInputField() {
    this.toggleInputField = true;
  }

  hideInputField() {
    this.toggleInputField = false;
  }
}

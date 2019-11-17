import { Component, Input } from '@angular/core';
import {Store} from "@ngrx/store";
import {viewAddTextBlock} from "../../../store/viewActions";
import {TextBlockModel} from "../../../model/app/TextBlockModel";

@Component({
  selector: 'cms-menu-button',
  styleUrls: ['../../../web/styles/menu-button.component.scss'],
  templateUrl: '../../../web/templates/cms/menu-button.component.html',
})
export class MenuButtonComponent {
  @Input() icon = '';

  constructor(
    private store: Store<any>
  ) {}

  appendBlock() {
    this.store.dispatch(viewAddTextBlock(new TextBlockModel()));
  }
}

import { Component, Input } from '@angular/core';
import {Store} from "@ngrx/store";
import {viewAddTextBlock} from "../../../store/viewActions";
import {TextBlockModel} from "../../../model/app/TextBlockModel";
import {httpCreateTextBlock} from "../../../store/httpActions";

@Component({
  selector: 'cms-menu-button',
  styleUrls: ['./menu-button.component.scss'],
  templateUrl: './menu-button.component.html',
})
export class MenuButtonComponent {
  @Input() icon = '';

  constructor(
    private store: Store<any>
  ) {}

  appendBlock() {
    this.store.dispatch(httpCreateTextBlock());
  }
}
